


const friend = {
    name: "Jordan",
    lastName: "Wahler",
    birthYear: 21,
    job: "student",

    calcAge: function (birthYear) {
        return 2025 - birthYear;
    }
}

console.log(friend.calcAge(friend.birthYear));