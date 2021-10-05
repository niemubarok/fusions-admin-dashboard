<template>
  <main-section>
    <modal-box v-model="isModalActive" button-label="Send reset link">
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

      <template #bottom>
        <a
          @click="isModalActive = false"
          class="float-right mb-4 cursor-pointer text-blue-400"
          >Back to login</a
        >
      </template>
    </modal-box>
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg"
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
      </div>
      <div>
        <floating-label-input
          label="User Name"
          type="email"
          icon="user"
          :modelValue="form.login"
        />
      </div>

      <div class="mt-4">
        <floating-label-input
          label="Password"
          type="password"
          icon="key"
          :modelValue="form.pass"
        />
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

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    CheckRadioPicker,
    Divider,
    JbButton,
    JbButtons,
    ModalBox,
    Logo,
    FloatingLabelInput
  },
  setup() {
    const form = reactive({
      login: "",
      pass: "",
      remember: true
    });
    const isModalActive = ref(false);

    const router = useRouter();

    const submit = () => {
      router.push("/dashboard");
    };

    return {
      isModalActive,
      form,
      submit,
      mdiAccount,
      mdiAsterisk
    };
  }
};
</script>
