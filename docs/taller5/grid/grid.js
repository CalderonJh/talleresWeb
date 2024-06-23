$(document).ready(function () {
  $.get("https://jsonplaceholder.typicode.com/users", loadData);
});


function loadData(data) {
  $.each(data, (index, user) => {
    let row = "<tr>" +
      "<td class='px-4 py-2'>" + user.id + "</td>" +
      "<td class='px-4 py-2'>" + user.name + "</td>" +
      "<td class='px-4 py-2'>" + user.username + "</td>" +
      "<td class='px-4 py-2'>" + user.email + "</td>" +
      "<td class='px-4 py-2'>" + user.phone + "</td>" +
      "<td class='px-4 py-2'>" + user.website + "</td>" +
      "</tr>";
    $("#user-table-body").append(row);
  });
}