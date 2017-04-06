/**
 * Created by drana on 4/6/17.
 */
$('table').on('click', '.btn', function()
{//replace table selector with an id selector, if you are targetting a specific table
    var row = $(this).closest('tr'),
        cells = row.find('td'),
        btnCell = $(this).parent();
    //set to work, you have the cells, the entire row, and the cell containing the button.
    //create button for clickable event
    //lower button table
});