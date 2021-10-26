<template>
  <main-section>
    <modal-box v-model="isModalActive">
      <div class="flex justify-center w-full">
        <logo />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center">
        Forgot Password?
      </div>
      <div
        style="font-size: 10pt; margin-top: -2px; margin-bottom: 15px"
        class="flex justify-center w-full text-gray-500 font-xs"
      >
        <small>
          Enter your email address below and we'll get you back on track.
        </small>
      </div>
      <form @submit.prevent="sendResetLink">
        <floating-label-input
          v-model="userEmail.model"
          icon="mail"
          type="email"
          label="Your email"
        />
        <small v-if="userEmail.isError" class="text-red-400">{{
          userEmail.errorMessage
        }}</small>
        <jb-buttons class="float-right mt-12">
          <jb-button
            :class="{
              'cursor-not-allowed opacity-50': !userEmail.model,
            }"
            :isDisabled="!userEmail.model"
            color="info"
            type="submit"
            label="Send reset link"
          />
        </jb-buttons>
      </form>
      <template #bottom>
        <div
          @click="isModalActive = false"
          class="float-left pb-4 cursor-pointer text-blue-400 mt-16"
        >
          <span class="inline-block align-middle">
            <feather-icon path="chevron-left"> </feather-icon>
          </span>
          <small class="-ml-2"> back to login </small>
        </div>
      </template>
    </modal-box>

    <!-- modal successfully sent reset password -->
    <modal-box v-model="isModalResetPassActive" has-divider>
      <div class="flex justify-center">
        <div
          class="rounded-full h-20 w-20 bg-green-200 flex justify-center items-center"
        >
          <feather-icon
            path="check"
            size="30px"
            class="text-green-500 animate-bounce"
          >
          </feather-icon>
        </div>
      </div>
      <div class="bg-green-100 p-3 py-5 rounded-md w-full">
        Successfully sent an email to &nbsp;
        <strong>{{ userEmail.model }}</strong>
      </div>

      <template #bottom>
        <div
          @click="isModalResetPassActive = false"
          class="float-left pb-2 cursor-pointer text-blue-400"
        >
          <span class="inline-block align-middle">
            <feather-icon path="chevron-left"> </feather-icon>
          </span>
          <small class="-ml-2 -mb-1"> Back to login </small>
        </div>
      </template>
    </modal-box>

    <!-- loading -->
    <div
      v-show="isLoading"
      class="flex items-center flex-col justify-center overflow-hidden fixed inset-0 z-40"
    >
      <div class="absolute inset-0 bg-gray-900 bg-opacity-80"></div>
      <div class="relative w-screen flex justify-center items-center">
        <div class="absolute left-2/4 animate-ping h-20 w-20">
          <logo />
        </div>
        <div
          class="mt-5 -ml-10 text-primary opacity-70 animate animate-pulse z-45 absolute top-1/2 left-1/2"
        >
          {{ loadingMessage }}
        </div>
      </div>
    </div>
    <!-- <div class="flex items-center justify-center"> -->
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg"
      @submit.prevent="submit"
      form
    >
      <div class="flex justify-center w-full">
        <logo class="mb-3" />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center font-lg">
        Welcome to Cloud Menu!
      </div>
      <div
        style="font-size: 10pt; margin-top: -2px; margin-bottom: 15px"
        class="flex justify-center w-full text-gray-500 font-xs"
      >
        <small v-if="!isError"> Please Log-in to your account </small>

        <small v-else class="text-red-400 bg-red-100 px-2 rounded-sm">
          {{ errorMessage }}
        </small>
      </div>
      <div>
        <div
          :class="{ 'border border-red-200 rounded-md': form.isUserNameError }"
        >
          <floating-label-input
            label="Username"
            type="email"
            icon="user"
            v-model="form.username"
          />
        </div>
        <small v-if="form.isUserNameError" class="text-red-400">{{
          form.errorMessage
        }}</small>
      </div>
      <div>
        <div
          class="mt-4"
          :class="{ 'border border-red-200 rounded-md': form.isPassError }"
        >
          <floating-label-input
            label="Password"
            :type="form.passType"
            icon="lock"
            v-model="form.pass"
            isPassword
          >
            <template #append>
              <feather-icon
                v-if="form.passType !== 'password'"
                path="eye"
                @click="passVisibility"
              />
              <feather-icon
                v-if="form.passType == 'password'"
                path="eye-off"
                @click="passVisibility"
              />
            </template>
          </floating-label-input>
        </div>
        <small v-if="form.isPassError" class="text-red-400">{{
          form.errorMessage
        }}</small>
      </div>

      <div class="mt-5 text-gray-500">
        <check-radio-picker
          name="remember"
          v-model="form.remember"
          :options="{ remember: 'Remember' }"
        />
      </div>

      <divider />

      <jb-buttons>
        <jb-button type="submit" color="info" label="Login" />
      </jb-buttons>
      <a
        @click="isModalActive = true"
        class="float-right mb-4 cursor-pointer text-blue-400"
        >Forgot password?</a
      >
    </card-component>
    <!-- </div> -->
  </main-section>
</template>

<script>
import { computed, reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Divider from "@/components/Divider.vue";
import JbButton from "@/components/JbButton";
import JbButtons from "@/components/JbButtons";
import ModalBox from "@/components/ModalBox";
import Logo from "@/components/Logo";
import FeatherIcon from "../components/FeatherIcon.vue";
import FloatingLabelInput from "../components/FloatingLabelInput.vue";
import Notification from "../components/Notification.vue";
import { useStore } from "vuex";

export default {
  name: "username",
  components: {
    MainSection,
    CardComponent,
    CheckRadioPicker,
    Divider,
    JbButton,
    JbButtons,
    ModalBox,
    Logo,
    FloatingLabelInput,
    FeatherIcon,
    // Notification,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const form = reactive({
      username: "",
      isUserNameError: false,
      pass: "",
      passType: "password",
      isPassError: false,
      remember: false,
      errorMessage: "",
    });
    const passVisibility = () => {
      form.passType = form.passType == "password" ? "text" : "password";
    };

    const isError = ref(false);
    const errorMessage = ref("");
    const userEmail = reactive({
      model: "",
      isError: false,
      errorMessage: "",
    });
    const isModalActive = ref(true);
    const isModalResetPassActive = ref(true);
    const isLoading = computed({
      get: () => store.state.loading,
    });
    const loadingMessage = computed({
      get: () => store.state.loadingMessage,
    });
    const notificationColor = ref("");

    const router = useRouter();

    const submit = async () => {
      isError.value = false;
      console.log(isError.value);
      if (form.username == "") {
        form.isUserNameError = true;
        form.errorMessage = "Please provide your username";
        notificationColor.value = "danger";
      } else if (form.pass == "") {
        // isError.value = false;
        form.isUserNameError = false;
        form.isPassError = true;
        form.errorMessage = "Have you typed your password?";
        notificationColor.value = "danger";
      } else {
        // isError.value = false;
        form.isUserNameError = false;
        form.isPassError = false;
        await store.dispatch("login", form);
        // if (route.path == "/" && !sessionStorage.getItem("token")) {
        if (route.path == "/" && !store.state.login.isAuth) {
          isError.value = true;
          errorMessage.value = store.state.login.message;
          form.pass = "";
          setTimeout(() => {
            isError.value = false;
          }, 10000);
          notificationColor.value = "danger";
          router.push({ name: "login" });
        } else {
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      }
    };

    const sendResetLink = async () => {
      await store.dispatch("forgotPassword", userEmail.model);
      if (store.state.isEmailSent) {
        isModalActive.value = false;
        isModalResetPassActive.value = true;
      } else {
        userEmail.isError = true;
        userEmail.errorMessage = store.state.resetPassErrorMessage;
      }
    };

    onMounted(() => {
      if (route.path == "/" && sessionStorage.getItem("token")) {
        router.push({ name: "dashboard" });
      }
    });

    return {
      isModalActive,
      isModalResetPassActive,
      form,
      submit,
      notificationColor,
      userEmail,
      sendResetLink,
      isLoading,
      loadingMessage,
      isError,
      errorMessage,
      passVisibility,
    };
  },
};
</script>
