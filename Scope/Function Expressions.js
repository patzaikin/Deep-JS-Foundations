// In this exercise, you will be writing some functions and function expressions, to manage the student enrollment records for a workshop.

// **Note:** The spirit of this exercise is to use functions wherever possible and appropriate, so consider usage of array utilities `map(..)`, `filter(..)`, `find(..)`, `sort(..)`, and `forEach(..)`.

// ## Instructions (Part 1)

// **Note:** In Part 1, use only function declarations or named function expressions.

// You are provided three functions stubs -- `printRecords(..)`, `paidStudentsToEnroll()`, and `remindUnpaid(..)` -- which you must define.

// At the bottom of the file you will see these functions called, and a code comment indicating what the console output should be.

// 1. `printRecords(..)` should:
// 	- take a list of student Ids
// 	- retrieve each student record by its student Id (hint: array `find(..)`)
// 	- sort by student name, ascending (hint: array `sort(..)`)
// 	- print each record to the console, including `name`, `id`, and `"Paid"` or `"Not Paid"` based on their paid status

// 2. `paidStudentsToEnroll()` should:
// 	- look through all the student records, checking to see which ones are paid but **not yet enrolled**
// 	- collect these student Ids
// 	- return a new array including the previously enrolled student Ids as well as the to-be-enrolled student Ids (hint: spread `...`)

// 3. `remindUnpaid(..)` should:
// 	- take a list of student Ids
// 	- filter this list of student Ids to only those whose records are in unpaid status
// 	- pass the filtered list to `printRecords(..)` to print the unpaid reminders

// ## Instructions (Part 2)

// Now that you've completed Part 1, refactor to use **only** `=>` arrow functions.

// For `printRecords(..)`, `paidStudentsToEnroll()`, and `remindUnpaid(..)`, assign these arrow functions to variables of such names, so that the execution still works.

// As the appeal of `=>` arrow functions is their conciseness, wherever possible try to use only expression bodies (`x => x.id`) instead of full function bodies (`x => { return x.id; }`).

function printRecords(recordIds) {
  return recordIds
    .map((recordId) => studentRecords.find((studentRecord) => studentRecord.id === recordId))
    .sort((record1, record2) => (record1.name > record2.name ? 1 : record2.name > record1.name ? -1 : 0))
    .forEach((enrolledStudent) =>
      console.log(`${enrolledStudent.name} (${enrolledStudent.id}): ${enrolledStudent.paid ? "Paid" : "NotPaid"}`)
    );
}

function paidStudentsToEnroll() {
  return [
    ...currentEnrollment,
    ...studentRecords
      .filter((studentRecord) => studentRecord.paid === true && !currentEnrollment.includes(studentRecord.id))
      .map((studentRecord) => studentRecord.id),
  ];
}

function remindUnpaid(recordIds) {
  return printRecords(
    recordIds.filter((recordId) => studentRecords.find((record) => record.id == recordId && record.paid === false))
  );
}

// ********************************

var currentEnrollment = [410, 105, 664, 375];

var studentRecords = [
  { id: 313, name: "Frank", paid: true },
  { id: 410, name: "Suzy", paid: true },
  { id: 709, name: "Brian", paid: false },
  { id: 105, name: "Henry", paid: false },
  { id: 502, name: "Mary", paid: true },
  { id: 664, name: "Bob", paid: false },
  { id: 250, name: "Peter", paid: true },
  { id: 375, name: "Sarah", paid: true },
  { id: 867, name: "Greg", paid: false },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
remindUnpaid(currentEnrollment);

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
