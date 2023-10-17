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

type Props = NativeStackScreenProps<RootStackParams, "Update">;

const UpdateUserScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user } = route.params;
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: user.first_name + " " + user.last_name,
    job: "",
  });

  const handleUpdateUser = async (data: any) => {
    setLoading(true);
    try {
      await axios
        .patch(`https://reqres.in/api/users/${user.id}`, data)
        .then((response) => {
          console.log(response.data);
          Alert.alert("User has been updated");
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
          title="Update Profile"
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
            title="Update User"
            style={{ marginBottom: 20 }}
            onPress={() => handleUpdateUser(dataUser)}
          />
        </View>
      </View>
    </>
  );
};

export default UpdateUserScreen;
