$(document).ready(function () {
  // Automatically load the first section (Dashboard) when the page loads
  loadSection("dashboard");

  // Handle clicks on main menu items
  $(".menu > ul > li > a").click(function (e) {
    e.preventDefault();

    var parentLi = $(this).parent("li");
    var submenu = parentLi.find(".sub-menu");

    // If the clicked menu item has a submenu, prevent it from closing
    if (submenu.length) {
      if (!parentLi.hasClass("active")) {
        // Close all other menus
        $(".menu ul li").removeClass("active");
        $(".sub-menu").slideUp();

        // Open the clicked menu
        parentLi.addClass("active");
        submenu.slideDown();
      }
    } else {
      // No submenu, so handle regular menu items
      $(".menu ul li").removeClass("active");
      $(".sub-menu").slideUp();

      // Set the clicked item as active
      parentLi.addClass("active");

      // Get the section to load
      var section = $(this).data("section");
      loadSection(section);
    }
  });

  // Handle clicks on submenu items
  $(".sub-menu li a").click(function (e) {
    e.preventDefault();

    // Keep the submenu open and load the selected section
    $(".sub-menu li").removeClass("active");
    $(this).parent("li").addClass("active");

    // Get the section to load
    var section = $(this).data("section");
    loadSection(section);
  });

  // Function to load a section via AJAX
  function loadSection(section) {
    // Clear the container and show loading message
    $(".container").html("<p>Loading...</p>");

    // Load the content via AJAX from the "sections" folder
    $.ajax({
      url: "content/" + section + ".html",
      method: "GET",
      success: function (data) {
        $(".container").html(data); // Replace content with the loaded data
      },
      error: function () {
        $(".container").html("<p>Error loading content.</p>"); // Handle errors
      },
    });
  }

  // Remove 'active' class when clicking outside the menu
  $(document).on("click", function (e) {
    // Check if the click is outside of the sidebar
    if (!$(e.target).closest(".sidebar").length) {
      // Remove active classes and close submenus
      $(".menu ul li").removeClass("active");
      $(".sub-menu").slideUp();
    }
  });
});
