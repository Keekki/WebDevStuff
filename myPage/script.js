'use strict;'

$(document).ready(function() {
    $(window).scroll(function() {
        if(this.scrollY > 20) {
            $('.navbar').addClass("sticky")
        }
        else {
            $('.navbar').removeClass("sticky")
        }
        if(this.scrollY > 500) {
            $('.scroll-up-button').addClass("show");
        }
        else {
            $('.scroll-up-button').removeClass("show");
        }
    })
});

// slide up script
$('.scroll-up-button').click(function(){
    $('html').animate({scrollTop: 0});
});

// toggle menu/navigation bar script
$('.menu-btn').click(function(){
    $('.navbar .menu').toggleClass("active")
    $('.menu-btn i').toggleClass("active")
});

const constraints = {
  name: {
      presence: { allowEmpty: false }
  },
  email: {
      presence: { allowEmpty: false },
      email: true
  },
  subject: {
      presence: { allowEmpty: false },
  },
  message: {
      presence: { allowEmpty: false }
  }
};

const form = document.getElementById('contact-form');

form.addEventListener('submit', function (event) {
  const formValues = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      subject: form.elements.subject.value,
      message: form.elements.message.value
  };

  const errors = validate(formValues, constraints);

  if (errors) {
      event.preventDefault();
      const errorMessage = Object
          .values(errors)
          .map(function (fieldValues) {
              return fieldValues.join(', ')
          })
          .join("\n");

      alert(errorMessage);
  }
}, false);
