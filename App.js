import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, Button } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [foodItem, setFoodItem] = useState([]);
  const [filteredFoodItem, setFilteredFoodItem] = useState([]);

  useEffect(() => {
    //serve ./ngrok.exe http 8080 in cmd to access the below url
    fetch("https://7202-45-112-68-52.in.ngrok.io/foodData")
      .then((response) => response.json())
      .then((json) => {
        setFoodItem(json);
        setFilteredFoodItem(json);
      })
      .catch((err) => {
        console.log("fetch error:", err)
      })
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
          <Button title="All" onPress={() => {
            setFilteredFoodItem([...foodItem])
          }} />
          <Button title="Fat Free" onPress={() => {
            setFilteredFoodItem([...foodItem.filter((foodItem) => foodItem.category === "Fat Free")])
          }} />
          <Button title="Vegan" onPress={() => {
            setFilteredFoodItem([...foodItem.filter((foodItem) => foodItem.category === "Vegan")])
          }} />
          <FlatList
            data={filteredFoodItem}
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
                <Text>{item.category}</Text>
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
