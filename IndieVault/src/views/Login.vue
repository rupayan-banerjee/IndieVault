<template>
    <div class="container login-page">
        <h2 class="text-center mb-4">Login to IndieVault</h2>

        <form @submit.prevent="handleLogin" class="glass-card p-4 mx-auto" style="max-width: 500px;">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" id="email" class="form-control" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" id="password" class="form-control" required />
            </div>

            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
</template>

<script>
import auth from '../store/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    name: 'Login',
    setup() {
        const email = ref('')
        const password = ref('')
        const errorMessage = ref('')
        const router = useRouter()

        const handleLogin = () => {
            const success = auth.login(email.value, password.value)
            if (!success) {
                errorMessage.value = 'Invalid email or password'
                return
            }
            router.push('/')
        }

        return {
            email,
            password,
            errorMessage,
            handleLogin
        }
    }
}
</script>

<style scoped>
.login-page {
    color: #f2f2f2;
    padding-top: 4rem;
}

.glass-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    border-radius: 12px;
}
</style>