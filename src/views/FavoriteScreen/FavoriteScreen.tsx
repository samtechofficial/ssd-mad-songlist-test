import React, { useEffect, useState, useMemo } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../../helper/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const FavoriteScreen = (props: any) => {
    const favorites = useSelector((state: RootState) => state.auth.favorites);
    const [favoriteList, setFavoriteList] = useState<any>(null);

    const onBack = () => {
        props.navigation.navigate('HomeScreen')
    }

    useEffect(() => {
        if (favorites) {
            setFavoriteList(favorites)
        }
    }, [favorites])


    const onOpenDetail = (params: any) => {
        props.navigation.navigate('DetailScreen', params)
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{ backgroundColor: COLORS.PRIMARY, padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Icon size={18} color={COLORS.SECONDARY} name="arrow-left" onPress={onBack} />
                <Text style={{ fontSize: 18, textTransform: 'capitalize', color: COLORS.SECONDARY, marginLeft: 10 }}>Favorite Playlist</Text>
            </View>
            <FlatList
                data={favoriteList}
                renderItem={({ item }) => (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onOpenDetail(item)} key={item.id}>
                        <View style={{ backgroundColor: '#DDD', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3, padding: 2, paddingHorizontal: 15 }}>
                            <Image source={{ uri: item.artworkUrl100 }} width={75} height={75} style={{ borderRadius: 3 }} />
                            <View style={{ flex: 1, paddingLeft: 10 }}>
                                <Text style={{ color: COLORS.PRIMARY }}>{item.collectionName}</Text>
                                <Text style={{ color: '#555', fontSize: 13 }}>{item.artistName}</Text>
                                <Text style={{ color: '#888', marginTop: 3, fontSize: 13 }} numberOfLines={3}>{item.shortDescription}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: COLORS.PRIMARY }}>Belum ada playlist Yang ditambahkan</Text>
                    </View>
                )}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(_, idx) => idx.toString()}
            />
        </SafeAreaView>
    );
};

export default FavoriteScreen