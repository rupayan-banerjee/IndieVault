<template>
    <div class="home">
        <!-- Welcome section styled as a hero block -->
        <section class="hero-section text-center py-5">
            <div class="container">
                <!-- Big heading to introduce the website -->
                <h1 class="display-5 fw-bold hero-title">Welcome to IndieVault!</h1>
                <!-- Short welcoming description -->
                <p class="lead hero-subtext">
                    Your ultimate destination for indie games, news, and community. Explore, play, and connect with
                    fellow gamers.
                </p>
            </div>
        </section>

        <!-- Section to visually showcase two images -->
        <section class="py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <!-- First image card -->
                    <div class="col-md-5 col-sm-8 mb-4">
                        <div class="card image-card border-0">
                            <img src="../assets/image1.jpg" class="card-img-top rounded" alt="Gaming Controller 1" />
                        </div>
                    </div>

                    <!-- Second image card -->
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
/* Hero section with a soft transparent background and blur effect */
.hero-section {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 12px;
    color: #f2f2f2;
}

/* Large title with shadow for better contrast */
.hero-title {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
}

/* Subtitle text with softened color */
.hero-subtext {
    color: #cccccc;
    font-size: 1.2rem;
}

/* Image card styling with smooth zoom effect */
.image-card {
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
}

/* Slight zoom-in on hover */
.image-card:hover {
    transform: scale(1.05);
}

/* Image inside the card - constrained height and smooth scaling */
.card-img-top {
    object-fit: cover;
    max-height: 400px;
    transition: transform 0.3s ease-in-out;
}
</style>