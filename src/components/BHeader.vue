<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">
            Add Book
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/get-book-count" class="nav-link" active-class="active">
            Get Book Count
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            Count Book API
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">
            Get All Book API
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">
            Get Weather
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
// no script logic needed
</script>
