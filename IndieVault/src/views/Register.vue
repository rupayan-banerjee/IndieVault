<template>
    <div class="container register-page">
        <h2 class="text-center mb-4">Create an Account</h2>

        <form @submit.prevent="handleRegister" class="glass-card p-4 mx-auto" style="max-width: 500px;">
            <!-- Full Name -->
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="name" type="text" id="name" class="form-control" required />
            </div>

            <!-- Email -->
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input v-model="email" type="email" id="email" class="form-control" required />
            </div>

            <!-- Password -->
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" id="password" class="form-control" required minlength="4" />
            </div>

            <!-- Role (user/admin) - only for testing, can be hidden later -->
            <div class="mb-3">
                <label class="form-label">Register as:</label>
                <select v-model="role" class="form-select">
                    <option value="user">Regular User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <!-- Error message if registration fails -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <!-- Submit -->
            <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'
import auth from '../store/auth'
import { useRouter } from 'vue-router'

export default {
    name: 'Register',
    setup() {
        const name = ref('')
        const email = ref('')
        const password = ref('')
        const role = ref('user')
        const errorMessage = ref('')
        const router = useRouter()

        const handleRegister = () => {
            const success = auth.register(name.value, email.value, password.value, role.value)
            if (!success) {
                errorMessage.value = 'Email already exists.'
                return
            }
            router.push('/')
        }

        return {
            name,
            email,
            password,
            role,
            errorMessage,
            handleRegister
        }
    }
}
</script>

<style scoped>
.register-page {
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