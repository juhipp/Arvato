document.addEventListener("DOMContentLoaded", function(event) {

 // variablen
  const desktopNav = document.querySelector('.main-nav-list');
  const mobileNav = document.querySelector('.mobile-nav-wrapper');
  const mobileNavIcon =  document.querySelector('.mobile-nav-icon');
  const topNav = document.querySelector('.top-nav-list');
  const navItem = document.querySelectorAll('.nav-item')
 
  // Scroll-event
  window.onscroll = function() {
    scrolling();
  };
 
  var el = document.querySelector(".top-nav");

  function scrolling() {
    if (window.pageYOffset > 100) {
      el.classList.add("sticky");
    }
    if(window.pageYOffset < 100) {
      el.classList.remove("sticky");
    }
  };

  //Suche anzeigen und speichern
  const searchInput = document.getElementById('search');
  const searchWords = [];

  document.querySelector('.fa-search').addEventListener('click', event => {
    searchInput.classList.toggle('input-clicked');
    if (searchInput.classList.contains('input-clicked')){
      searchInput.value ="";
    } else { 
      searchWords.push(searchInput.value);  
    }
  });

// check window-witdth and add MobileNav
  let createMobileNav = function(){

    mobileNav.appendChild(desktopNav).appendChild(topNav);
    mobileNavIcon.style.display ='block';
    mobileNavIcon.addEventListener('click', event => {
     
      mobileNav.classList.toggle('active');
      if (mobileNav.classList.contains('active')){
        mobileNav.appendChild(desktopNav).appendChild(topNav);
      } else  {
        mobileNav.removeChild(desktopNav).remove(topNav);
      }
    });
  }

  var onresize = function() {
  
    let windowWidth = window.innerWidth;
    if(windowWidth < 710 ){
      desktopNav.classList.add('mobile');
      createMobileNav();
    } else {
      document.querySelector('.top-nav-right').appendChild(topNav)
      document.querySelector('.main-nav').appendChild(desktopNav)
      mobileNavIcon.style.display ='none';
      desktopNav.classList.remove('mobile');
    }
  }
  window.addEventListener("resize", onresize);
  onresize();

//open-close Basket
  document.querySelector('.shoppingbasketItems').addEventListener('click', event => {
    document.querySelector('.shoppingbasketItems-list').classList.toggle('active-basket');
  })
  
//Intro Headline -taken fom menue item data
  Array.from(navItem).forEach(link => {
    link.addEventListener('click', event =>{
      var targetElement = event.target.getAttribute('data-title');
      var productHeadline = document.querySelector('.intro-text-headline')
      productHeadline.setAttribute('data-title', targetElement)
      productHeadline.innerHTML = targetElement;
    })
  });
  
 //invinite scrolling width VUE
 var vm = new Vue( {

    el: '#app',
    data: {
      loading: false,
      nextItem: 1,
      maxItem: 100,
      test :'text',
      items: [],
      products: [

        { name: 'Product-1', 
          description: 'schwarzes T-Shirt', 
          colorsArr: [ 
            'black', 'white'
          ], 
          sizeArr: [
            'S', 'M', 'L'
          ], 
          price: '39,99€',
          imageUrl: 'sources/pics/pics1.jpg', 
        },
        
        { name: 'Product-2', 
          description: 'gelber Woll-Schal', 
          colorsArr:  [ 
            'beige'
          ], 
          sizeArr: [
            'onesize'
          ],
           price: '9,99€', 
          imageUrl: 'sources/pics/pic2.jpg'
        },

        { name: 'Product-3', 
          description: 'schwarzes T-Shirt', 
          colorsArr:  [ 
            'blue', 'white'
          ],
          sizeArr: [ 
            'M', 'L'
          ], 
          price: '39,99€', 
          imageUrl: 'sources/pics/pics1.jpg', 
        },

        { name: 'Product-4', 
          description: 'gelber Woll-Schal',
          colorsArr: [
             'beige'
            ], 
          sizeArr: [
            'onesize'
          ],
          price: '9,99€',
          imageUrl: 'sources/pics/pic2.jpg',
        },

        { name: 'Product-5', 
          description: 'schwarzes T-Shirt', 
          colorsArr: [ 
            'blue', 'red', 'purple'
          ],
          sizeArr: [
            'S', 'M', 'L' ,'XL'
          ], 
          price: '39,99€',
          imageUrl: 'sources/pics/pics1.jpg' ,
        },
      ],
      shoppingbasket :[],
      amountItemsBasket: '',
    }, 

    mounted () {
      const listElm = document.querySelector('#list');
      listElm.addEventListener('scroll', e => {
        if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
          this.loadMoreItems();
        }
      });
      this.loadMoreItems();
    },

    methods: {
      loadMoreItems () {
        
        if(this.items.length < this.maxItem){
          this.loading = true;
          setTimeout(e => {
            for (var i = 0; i < 20; i++) {
              this.items.push('Item ' + this.nextItem++);
            }
            this.loading = false;
          }, 600);
        }
      },

      addToShoppingBasket: function (e,  event) {
        event.target.classList.toggle('active')
        if( event.target.classList.contains('active')){
          this.shoppingbasket.push(e)
        } else {
          for( var i = 0; i < this.shoppingbasket.length; i++){
            if ( this.shoppingbasket[i] === e) {
              this.shoppingbasket.splice(i, 1);
            }
          }
        } 
        this.amountItemsBasket = this.shoppingbasket.length;
        if(this.amountItemsBasket > 0  && window.innerWidth > 710){
          document.querySelector('.shoppingbasketItems').innerHTML = this.amountItemsBasket;
         } else {
           document.querySelector('.shoppingbasketItems').innerHTML = '';
         }
      },
  
      close: function(){
        document.querySelector('.shoppingbasketItems-list').classList.remove('active-basket');
      },

      checkcolors: function( val, event){
        switch (val){
          case 'white':
            event.target.classList.add('white');
          break;
          case 'red':
            event.target.style.background = '#EB6A3F';
          break;
          case 'blue':
            event.target.style.background = '#375682';
          break;
          case 'beige':
            event.target.style.background = '#f9e4b7';
          break;
          default:
            event.target.style.background = val;
        }
      }, 

      resetcolor:function(){
        let bgcolor= document.querySelectorAll('.color-field');
        Array.from(bgcolor).forEach(link => {
          link.style.background = 'none';
          link.classList.remove ('white')
        })
      }, 
    }, 
  })
});
