<template>
  <main-section>
    <modal-box v-model="isModalActive" has-cancel>
      <div class="flex justify-center w-full ">
        <logo />
      </div>
      <div class="flex justify-center w-full text-gray-500 text-center">
        Forgot Password?
      </div>
      <div class="flex justify-center w-full text-gray-500 font-xs">
        Enter your email address below and we'll get you back on track.
      </div>
      <small>Please enter your email</small>
      <div class="relative focus-within:border-blue-500 my-4">
        <input
          name="forgot"
          type="email"
          class="rounded-md w-full block appearance-none bg-transparent focus:outline-none"
          placeholder=""
        />
        <label for="forgot" class="absolute top-0 -z-1 ml-2 mt-2 text-gray-300"
          >Your Email
        </label>
      </div>
    </modal-box>
    <div class="w-2/5 flex justify-center">
      <!-- <card-component class="w-full bg-gray-500"> -->
      <div class="flex items-center">
        <img src="/assets/img/logo _cloud_menu.png" />
        <strong class="ml-2">Cloud Menu</strong>
      </div>
      <!-- </card-component> -->
    </div>
    <card-component
      class="w-11/12 md:w-5/12 bg-transparent rounded-lg"
      @submit.prevent="submit"
      form
    >
      <field label="Login" help="Please enter your login">
        <control
          v-model="form.login"
          :icon="mdiAccount"
          name="login"
          autocomplete="username"
        />
      </field>

      <field label="Password" help="Please enter your password">
        <control
          v-model="form.pass"
          :icon="mdiAsterisk"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </field>

      <check-radio-picker
        name="remember"
        v-model="form.remember"
        :options="{ remember: 'Remember' }"
      />

      <divider />

      <jb-buttons>
        <jb-button type="submit" color="info" label="Login" />
      </jb-buttons>
      <a @click="isModalActive = true" class="float-right mb-4 cursor-pointer"
        >forgot password?</a
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

export default {
  name: "Login",
  components: {
    MainSection,
    CardComponent,
    CheckRadioPicker,
    Field,
    Control,
    Divider,
    JbButton,
    JbButtons,
    ModalBox,
    Logo
  },
  setup() {
    const form = reactive({
      login: "",
      pass: "",
      remember: true
    });
    const isModalActive = ref(true);

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
