import Login from "./Login";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./Home";
import TakePic from "./TakePic"
import AnimalList from "../Components/AnimalList";

const AppNavigator = createStackNavigator({
    Login: {
        screen: Login,
    },
    Home: {
        screen: Home
    },
    TakePic: {
        screen: TakePic
    },
    AnimalList: {
        screen: AnimalList
    }
}, {
    headerMode: 'none',
});

export default createAppContainer(AppNavigator);
