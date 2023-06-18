<script>
    //export const ssr = false; 
    import Cookies from 'js-cookie';
    import { goto } from '$app/navigation'; 
    let user = Cookies.get('username');
</script>

<div class="container">
<header>
    <div id="header">
        Bonjour, {user}
        <button id="btton"><i id="icon_search" class="fa-solid fa-magnifying-glass"></i></button>
    </div>
        
</header>

<main>
    <slot></slot>
</main>
  
<footer>
    <div id="footer">
        <a id="buttonfooter" href="/stock"><i id="icon_house" class="fa-solid fa-house"></i></a>
        <a id="buttonfooter" href="/list"><i id="icon_list" class="fa-solid fa-list"></i></a>
        <a id="buttonfooter" href="/social"><i id="icon_heart" class="fa-solid fa-heart"></i></a>
        <a id="buttonfooter" href="/stock"><i id="icon_user" class="fa-solid fa-user"></i></a>
    </div>
</footer>

</div>
<style>

@import '@fortawesome/fontawesome-free/css/all.css';

main {
  overflow: hidden;
}

#header {
    color: black;
    border-radius: 10px;
    text-align: center;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    margin: 10px;
    margin-top: 20px;
}

#icon_search {
    float: right; /* Float the search element to the right */
    text-align: center;
    text-decoration: none;
    color: black;
}

#footer {
    background-color: grey;
    color: #fff;
    padding: 2px;
    padding-bottom: 10px;
    text-align: center;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    margin-top: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

#icon_house, #icon_list, #icon_heart, #icon_user {
    color: #3fb945;
    font-size: 30px;
    margin: 10px;
    margin-left: 22px;
    margin-right: 22px;
}

#btton , #buttonfooter {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 20px;
}

#btton {
  float: right;
}
#btton:hover {
    color: #3fb945;
}
</style>


  
  
  