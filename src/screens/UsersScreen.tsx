import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { DashboardHeader, SearchInputText } from "../components";
import { RootStackParams } from "../stack/RootStackScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";
import { LogoutModal } from "../components/dashboard";
import { AppContext } from "../context/AppContext";
import Loading from "../components/global/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Users">;

interface BoxItemProps {
  name: string;
  count: number;
  style?: ViewStyle;
}

interface AssetProps {
  style?: ViewStyle;
  data: any;
  handleEditUser?: () => void;
  handleDetailUser?: () => void;
}

const AssetItemComponent = ({
  data,
  style,
  handleEditUser,
  handleDetailUser,
}: AssetProps) => {
  return (
    <TouchableOpacity
      onPress={handleDetailUser}
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
        borderBottomWidth: 3,
        borderBottomColor: "#F9F9F9",
        paddingBottom: 10,
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          // marginRight: 10,
        }}
        source={{
          uri: data.avatar,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "75%",
          paddingLeft: 20,
        }}
      >
        <View>
          <Text
            style={[
              TEXT_STYLES.text500,
              {
                color: "#06122B",
                paddingBottom: 7,
              },
            ]}
          >
            {data.email}
          </Text>
          <Text
            style={[
              TEXT_STYLES.text500Bold,
              {
                color: "#06122B",
                fontSize: 16,
                paddingBottom: 5,
                fontWeight: "700",
              },
            ]}
          >
            {data.first_name + " " + data.last_name}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleEditUser}>
        <LinearGradient
          colors={["#7DC1FF", "#278CEA"]}
          //   start={{ x: 0, y: 1 }}
          start={{ x: 0.7, y: 0 }}
          //   end={{ x: 1, y: 0 }}
          style={{
            height: 45,
            width: 45,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome size={20} name={"pencil"} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};
const UsersScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [modal, setModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const { loginStatus, setLoginStatus } = useContext(AppContext);

  const handleUpdateUser = (user: any) => {
    navigation.push("Update", {
      user: user,
    });
    // navigation.navigate("EditStack", {
    //   screen: "Edit",
    // });
  };
  const handleDetailUser = (user: any) => {
    navigation.push("Detail", {
      user: user,
    });
  };

  const getAllUsers = async () => {
    try {
      await axios.get("https://reqres.in/api/users?page=2").then((response) => {
        // console.log("response", response.data.data);
        setAllUsers(response.data.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, [allUsers]);
  const handleLogout = () => {
    AsyncStorage.removeItem("@token");
    setLoginStatus(!loginStatus);
  };

  const handleCreateUser = () => {
    navigation.navigate("CreateUser");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
      }}
    >
      <DashboardHeader onPressLogout={() => setModal(true)} />
      <View
        style={{
          marginTop: 10,
          // paddingVertical: 15,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            TEXT_STYLES.text600,
            {
              color: "#06122B",
              marginBottom: 15,
            },
          ]}
        >
          List Users
        </Text>
        <TouchableOpacity onPress={handleCreateUser}>
          <LinearGradient
            colors={["#7DC1FF", "#278aaA"]}
            //   start={{ x: 0, y: 1 }}
            start={{ x: 0.7, y: 0 }}
            //   end={{ x: 1, y: 0 }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="plus" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {loading ? <Loading /> : null}
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            padding: 15,
          }}
        >
          {!loading && allUsers.length
            ? allUsers.map((item, key) => (
                <AssetItemComponent
                  key={key}
                  data={item}
                  handleEditUser={() => handleUpdateUser(item)}
                  handleDetailUser={() => handleDetailUser(item)}
                />
              ))
            : null}
        </View>
      </ScrollView>
      <LogoutModal
        handleLogout={handleLogout}
        isVisible={modal}
        cancle={() => setModal(false)}
        onBackdropPress={() => setModal(false)}
      />
    </View>
  );
};

export default UsersScreen;
