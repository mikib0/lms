import { useNavigation } from "react-router-dom";

export default function(){
  const navigation = useNavigation();
  const isRedirecting =
    navigation.state == 'loading' &&
    navigation.formData != null &&
    navigation.formAction !== navigation.location.pathname;
    return isRedirecting
}