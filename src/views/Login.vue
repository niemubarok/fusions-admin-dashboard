<template>
  <main-section>
    <modal-box v-model="isModalActive">
      <div class="flex justify-center w-full ">
        <logo />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center">
        Forgot Password?
      </div>
      <div
        style="font-size:10pt;margin-top:-2px;margin-bottom:15px"
        class="flex justify-center w-full text-gray-500 font-xs "
      >
        <small>
          Enter your email address below and we'll get you back on track.
        </small>
      </div>

      <floating-label-input icon="mail" label="Your email" />
      <jb-buttons class="float-right mt-12">
        <jb-button
          :class="{
            'cursor-not-allowed bg-red':
              form.newPassword !== form.repeatNewPassword
          }"
          :isDisabled="form.newPassword !== form.repeatNewPassword"
          type="submit"
          color="info"
          label="Send reset link"
        />
      </jb-buttons>
      <template #bottom>
        <div
          @click="isModalActive = false"
          class="float-left  pb-4 cursor-pointer text-blue-400 mt-16"
        >
          <span class="inline-block align-middle ">
            <feather-icon path="chevron-left"> </feather-icon>
          </span>
          <small class="-ml-2 ">
            back to username
          </small>
        </div>
      </template>
    </modal-box>
    <!-- <div class="flex items-center justify-center"> -->
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg "
      @submit.prevent="submit"
      form
    >
      <div class="flex justify-center w-full ">
        <logo class="mb-3" />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center font-lg">
        Welcome to Cloud Menu!
      </div>
      <div
        style="font-size:10pt;margin-top:-2px;margin-bottom:15px"
        class="flex justify-center w-full text-gray-500 font-xs "
      >
        <small>
          Please Log-in to your account
        </small>

        <notification
          v-if="form.errorMessage"
          :color="notificationColor"
          class="absolute top-2 right-3 p-2 "
        >
          <!-- :outline="true" -->
          {{ form.errorMessage }}
        </notification>
      </div>
      <div>
        <div
          :class="{ 'border border-red-200 rounded-md': form.isUserNameError }"
        >
          <floating-label-input
            label="Username"
            type="text"
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
            type="password"
            icon="lock"
            v-model="form.pass"
          />
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import MainSection from "@/components/MainSection";
import CardComponent from "@/components/CardComponent";
import CheckRadioPicker from "@/components/CheckRadioPicker";
import Field from "@/components/Field";
import Control from "@/components/Control";
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
    Notification
  },
  setup() {
    const store = useStore();
    const form = reactive({
      username: "",
      isUserNameError: false,
      pass: "",
      isPassError: false,
      remember: false,
      errorMessage: ""
    });
    const isModalActive = ref(false);
    const notificationColor = ref("");

    const router = useRouter();

    const submit = () => {
      if (form.username == "") {
        form.isUserNameError = true;
        form.errorMessage = "Please provide your username";
        notificationColor.value = "danger";
      } else if (form.pass == "") {
        form.isUserNameError = false;
        form.isPassError = true;
        form.errorMessage = "Have you typed your password?";
        notificationColor.value = "danger";
      } else {
        form.isUserNameError = false;
        form.isPassError = false;
        store.dispatch("login", form);
        if (localStorage.getItem("token")) {
          router.push("/dashboard");
        } else {
          form.errorMessage = "Incorrect username or password";
          notificationColor.value = "danger";
          router.push({ name: "login" });
        }
      }
    };

    return {
      isModalActive,
      form,
      submit,
      mdiAccount,
      mdiAsterisk,
      notificationColor
    };
  }
};
</script>
