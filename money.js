
if (localStorage.getItem("money_count") == null) {
  var money = 0;
  localStorage.setItem("money_count", money);
} else {
  localStorage.getItem("money_count");
  money = localStorage.getItem("money_count");
}
var moneys_text;
function giveMoney() {
  money++;
  localStorage.setItem("money_count", money);
  document.getElementById("money_display_text").innerHTML =
    "Amount Gained = " + localStorage.getItem("money_count");
  if (money == null) {
    money = 0;
  }

  console.log(money);
}