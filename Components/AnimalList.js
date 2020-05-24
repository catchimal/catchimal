import React, { useEffect, useState } from "react";

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Switch,
  ActivityIndicator,
} from "react-native";
import Card from "./Card";

function AnimalList(props) {
  let { title } = props;

  const [isEnabled, setIsEnabled] = useState(false);

  let data = [
    {
      albumId: 1,
      id: 1,
      title: "accusamus beatae ad facilis cum similique qui sunt",
      url: "https://via.placeholder.com/600/92c952",
      thumbnailUrl: "https://via.placeholder.com/150/92c952",
    },
    {
      albumId: 1,
      id: 2,
      title: "reprehenderit est deserunt velit ipsam",
      url: "https://via.placeholder.com/600/771796",
      thumbnailUrl: "https://via.placeholder.com/150/771796",
    },
    {
      albumId: 1,
      id: 3,
      title: "officia porro iure quia iusto qui ipsa ut modi",
      url: "https://via.placeholder.com/600/24f355",
      thumbnailUrl: "https://via.placeholder.com/150/24f355",
    },
    {
      albumId: 1,
      id: 4,
      title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      url: "https://via.placeholder.com/600/d32776",
      thumbnailUrl: "https://via.placeholder.com/150/d32776",
    }
  ];

  const handleTouch = () => {};

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.titleBar}>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
        <View>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.list}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View>
              <Card style={styles.walls} theme={isEnabled}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => handleTouch(item)}
                >
                  <Image
                    source={{
                      uri: item.url,
                    }}
                    style={{ width: 300, height: 300 }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                  <Text style={styles.picDescription}>{item.title}</Text>
              </Card>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  contentContainer: {
    paddingTop: 30,
  },
  load: {
    flex: 1,
    justifyContent: "center",
  },
  titleBar: {
    padding: 5,
    height: 50,
    width: "80%",
    marginLeft: 30,
    borderColor: "black",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 20,
    borderTopWidth: 5,
    borderBottomWidth: 5,
  },
  textStyle: {
    fontSize: 20,
  },
  picDescription:{
    color:'cyan',
    fontWeight:'bold',
  },
  walls: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    alignItems: "center",
    marginBottom: 50,
  },
});

export default AnimalList;
