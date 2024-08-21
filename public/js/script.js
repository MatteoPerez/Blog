document.addEventListener('DOMContentLoaded', function(){
    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    for(var i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener('click', function(){
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expended', 'true');
            searchInput.focus();
        })
    }
    searchClose.addEventListener('click', function(){
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expended', 'false');
    })
});

// When the user clicks on the button, toggle between hiding and showing the dropdown content
function showDropdown() {
  document.getElementById("dropdownContent").classList.toggle("show");
}

// Check which type of device the user is on
window.onload = function() {
    if (window.innerWidth < 768) {
        document.getElementById('header__mobile').style.display = 'grid';
        document.getElementById('header__desktop').style.display = 'none';
    } else {
        document.getElementById('header__desktop').style.display = 'grid';
        document.getElementById('header__mobile').style.display = 'none';
    }
};

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown__content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}