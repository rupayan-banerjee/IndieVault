<!-- src/views/Home.vue -->
<template>
    <div class="home">
        <h1 class="text-center my-4">Welcome to Our Web App!</h1>

        <p class="lead text-center">
            This is a sample project built using Vue.js 3 and Bootstrap to demonstrate modern interface design.
        </p>

        <div class="row mt-5">
            <!-- First image -->
            <div class="col-md-6 mb-4">
                <img src="../assets/image1.jpg" alt="Sample 1" class="img-fluid rounded shadow" />
            </div>

            <!-- Second image -->
            <div class="col-md-6 mb-4">
                <img src="../assets/image2.jpg" alt="Sample 2" class="img-fluid rounded shadow" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
/* Optional: Add custom styles */
img {
    max-height: 300px;
    object-fit: cover;
}
</style>