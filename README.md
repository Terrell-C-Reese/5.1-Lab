# 5.1-Lab
# 5.1-Lab


How did you dynamically create and append new elements to the DOM?


Essentially, we needed to use .createElement to create a parent-child relationship. Additionally, the utilization of the span tag allowed us to insert the product details and buttons. Adding some CSS, attaching the event listeners and setting the text context allowed us to append within the list tags. Finally, we append the list tags into the unordered list container so it can be displayed on the actual page.


What steps did you take to ensure accurate updates to the total price?


The updateTotalPrice function handled the changes in price. The utilizations of the pricing and quantites were saved via the dataset attributes which were located on the list element. To make the pricing easier to read I reduced the pricing to 2 decimal plces so users can clearly understand that its pricing amount.


How did you handle invalid input for product name or price?


The first thing I did was include trim() to remove any extra spacing> I made sure the price input was converted into a number as well. I set up a conditional statement to check if any input fields were blank, if the price was a valid number that did not include zero or negatives. An alert was created to show if any checks were failed. Implementing returns for these checks allowed the program to stop so no invalid entries would be stored.


What challenges did you face when implementing the remove functionality?


The biggest challenge was verifying that the remove button actually deleted the entire product entry. It took me a minute to figure out why the button was the only thing being removed but figured out that i needed to target the closest list entry. The other challenge was making sure the price total was updating accurately. PEMDAS was the answer to this problem because we had to make sure multiplication was done before subtracting. The last assignment allowed me to make plenty of mistakes with localStorage so I didn't run into too many issues on that.
