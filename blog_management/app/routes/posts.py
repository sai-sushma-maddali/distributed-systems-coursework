from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.dependencies import get_current_user, require_roles
from app.models import create_post, delete_post, get_all_posts

router = APIRouter()


class PostRequest(BaseModel):
    title: str
    content: str


@router.get("")
def get_posts(current_user: dict = Depends(get_current_user)):
    posts = get_all_posts()
    return {"posts": posts, "requested_by": current_user["username"]}


@router.post("", status_code=201)
def add_post(
    post: PostRequest,
    current_user: dict = Depends(require_roles("writer", "moderator")),
):
    post_id = create_post(post.title, post.content, current_user["username"])
    return {
        "message": "Post created successfully",
        "post_id": post_id,
        "created_by": current_user["username"],
    }


@router.delete("/{post_id}")
def remove_post(
    post_id: int,
    current_user: dict = Depends(require_roles("moderator")),
):
    affected = delete_post(post_id)
    if affected == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": f"Post {post_id} deleted successfully"}
