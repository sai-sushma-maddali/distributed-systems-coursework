# Summary & Tags Agent (LangChain + Ollama)

This project demonstrates a multi-agent workflow using **LangChain** and **Ollama** to automatically generate, review, and clean **blog summaries and tags**.

## Overview

The system processes a blog title and blog content through three agents:

1. **Planner Agent**
   - Generates **exactly 3 topical tags**
   - Generates a **one-sentence summary (≤ 25 words)**
   - Outputs structured JSON

2. **Reviewer Agent**
   - Validates the summary length
   - Ensures exactly 3 tags
   - Regenerates outputs only if rules are violated

3. **Finalizer Agent**
   - Cleans tags (replaces `_` with spaces)
   - Removes invalid special characters from the summary
   - Produces the final JSON output

## Tech Stack

- Python
- LangChain
- Ollama
- Models used:
  - `smollm:1.7b` (Planner & Reviewer)
  - `llama3.2:latest` (Finalizer)

## Installation

Make sure you have Ollama running and the required models pulled:

```bash
ollama pull smollm:1.7b
ollama pull llama3.2
