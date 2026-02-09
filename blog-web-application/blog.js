"use strict";

// Validation to check if user has entered blog content of more than 25 characters
const contentLength = () => {
	const blogtext = document.getElementById("blog_content").value;
	if (blogtext.length < 25){
	alert("Blog content should be more than 25 characters");
	return false;}
	return true;
}

// Validation to check if user has checked terms and conditions checkbox
const checkboxChecked = () =>{
	var isChecked = document.getElementById("tc").checked;
	if (isChecked == false) {
		alert("You must agree to the terms and conditions");
		return false
	}
	return true;
}

// checking if Validations meet
const validateFormSubmission = () =>{
	const isContentLengthValid = contentLength();
	const isCheckBoxChecked = checkboxChecked();
	
	if (isContentLengthValid && isCheckBoxChecked){
		alert("Form submitted successfully !");
		return true;
	}
	return false;
}


// Counting form submissions
const countFormSubmission = (() => {
	let submissionCount = 0;
	return () => ++ submissionCount;
})();

// convert form data into JSON string and log output in the console

document.getElementById("blogForm").addEventListener("submit", async (e) => {
	e.preventDefault();
	const title = document.getElementById("btitle").value
	const name = document.getElementById("authorname").value
	const email = document.getElementById("email").value
	const content = document.getElementById("blog_content").value
	const categoryChoice = document.getElementById("category").value

	const formData = {title, name, email, content, categoryChoice};

	const jsonFormData = JSON.stringify(formData);
	//alert("Form submitted successfully !")
	console.log(jsonFormData)
	
	// Object Destructuring
	const parsedFormData = JSON.parse(jsonFormData)
	const {title: blogtitle, email: authorEmail} = parsedFormData;
	console.log("Blog Title:", blogtitle)
	console.log("Author's Email:", authorEmail)
	
	// Using Spread Operator to add new field
	const currentDate = new Date();
	const updatedFormData = {...parsedFormData, submissionDate: currentDate};
	console.log("Updated Form Data:", updatedFormData);
	
	// Including countFormSubmission
	const currentCount = countFormSubmission();
	const updatedFormDataCount = {...updatedFormData, count: currentCount};
	console.log("Updated Form Data with count:", updatedFormDataCount)
});

