import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [foodItem, setFoodItem] = useState([]);

  useEffect(() => {
    fetch("http://192.168.0.113:8080/foodData")
      .then((response) => response.json())
      .then((json) => setFoodItem(json))
      .catch((err) => console.log("fetch error:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Text style={styles.heading}>Food Application</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FlatList
            data={foodItem}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.liststyle}>
                <Image
                  source={{ uri: item.img}}
                  style={{
                    resizeMode: "center",
                    height: 70,
                    width: 70,
                  }}
                />
                <Text>{item.title}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  heading: {
    fontSize: 14,
    color: "green",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10,    
  },
  liststyle: {
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    display: "flex",
    justifyContent: "space-between",
  }
});
