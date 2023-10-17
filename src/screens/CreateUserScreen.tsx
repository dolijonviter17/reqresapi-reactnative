import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  ButtonComponent,
  DashboardHeader,
  HeaderComponent,
  TextInputComponent,
} from "../components";
import { RootStackParams } from "../stack/RootStackScreen";
import { CategoryQuestionProps } from "../state/actions";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { TEXT_STYLES } from "../assets/fonts";
import { Image } from "react-native";
import { IMAGES_ASSETS } from "../assets/images";
import { LogoutModal } from "../components/dashboard";
import { AppContext } from "../context/AppContext";
const { height, width } = Dimensions.get("window");
import AntDesign from "react-native-vector-icons/AntDesign";
import Loading from "../components/global/Loading";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParams, "CreateUser">;

const CreateUserScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const { loginStatus, setLoginStatus } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    job: "",
  });

  const [modal, setModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryQuestionProps>({
      title: "",
      param: "",
      icon: "",
    });
  const handleSelectCategory = (category: CategoryQuestionProps): void => {
    setSelectedCategory({
      ...selectedCategory,
      title: category.title,
      param: category.param,
      icon: category.icon,
    });
    setModal(true);
  };

  const handleLogout = () => {
    console.log("log out");
    setLoginStatus(!loginStatus);
  };

  const handleCreateUser = async (user: any) => {
    setLoading(true);
    try {
      await axios.post("https://reqres.in/api/users", user).then((response) => {
        console.log(response.data);
        Alert.alert("User has been added");
        navigation.navigate("Users");
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F9F9F9",
        }}
      >
        <HeaderComponent
          title="Create Profile"
          onPress={() => navigation.goBack()}
        />

        <View
          style={{
            marginTop: 40,
            paddingHorizontal: 10,

            // paddingTop: 15,
            // paddingHorizontal: 10,
            // alignItems: "center",
          }}
        >
          {loading ? <Loading /> : null}
          <TextInputComponent
            label="Name"
            placeholder="Write Name"
            value={dataUser.name}
            borderColor={colors.border}
            onChangeText={(e) =>
              setDataUser({
                ...dataUser,
                name: e,
              })
            }
          />
          <TextInputComponent
            label="Job"
            placeholder="Write Job"
            value={dataUser.job}
            borderColor={colors.border}
            onChangeText={(e) =>
              setDataUser({
                ...dataUser,
                job: e,
              })
            }
          />
          <ButtonComponent
            title="Save"
            style={{ marginBottom: 20 }}
            onPress={() => handleCreateUser(dataUser)}
          />
        </View>
      </View>
    </>
  );
};

export default CreateUserScreen;
