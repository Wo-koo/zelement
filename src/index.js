import Alert from "./components/alert/index.js";

const components = [
    Alert,
]

components.forEach(component => {
    Vue.component(component.name, component);
  });

export default{
    Alert,
}