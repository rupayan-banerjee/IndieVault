<template>
    <div class="home">
        <!-- Hero Section -->
        <section class="hero-section text-center py-5">
            <div class="container">
                <h1 class="display-5 fw-bold hero-title">Welcome to IndieVault!</h1>
                <p class="lead hero-subtext">
                    This is just the starting point of something much more exciting.
                </p>
            </div>
        </section>

        <!-- Image Section -->
        <section class="py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <!-- First Image -->
                    <div class="col-md-5 col-sm-8 mb-4">
                        <div class="card image-card border-0">
                            <img src="../assets/image1.jpg" class="card-img-top rounded" alt="Gaming Controller 1" />
                        </div>
                    </div>

                    <!-- Second Image -->
                    <div class="col-md-5 col-sm-8 mb-4">
                        <div class="card image-card border-0">
                            <img src="../assets/image2.jpg" class="card-img-top rounded" alt="Gaming Controller 2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
/* Hero section with dark overlay and blending */
.hero-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 12px;
    color: #f2f2f2;
}

/* Title and description styling */
.hero-title {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

.hero-subtext {
    color: #cccccc;
    font-size: 1.2rem;
}

/* Image card hover animation */
.image-card {
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
}

.image-card:hover {
    transform: scale(1.05);
}

.card-img-top {
    object-fit: cover;
    max-height: 400px;
    transition: transform 0.3s ease-in-out;
}
</style>