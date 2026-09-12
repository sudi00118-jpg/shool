document.addEventListener("DOMContentLoaded", () => {
  console.log("School Portal System Ready!");

  // የፍለጋ (Search) ወይም የማጽጃ ቀላል ፋንክሽን ናሙና
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const value = e.target.value.toLowerCase();
      console.log("Searching for:", value);
    });
  }
});

// ለሎግ-አውት ወይም ለማስታወቂያዎች ማስጠንቀቂያ
function logoutAlert() {
  alert("ከሲስተሙ እየወጡ ነው!");
}
