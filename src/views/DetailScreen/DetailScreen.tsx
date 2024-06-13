import React, { useEffect, useState, useMemo } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, FlatList } from "react-native";
import { COLORS } from "../../helper/colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import { formateDate } from "../../helper/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addFavorite } from "../../redux/reducer/appSlice";

const DetailScreen = (props: any) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.auth.favorites);
    const { params } = props.route
    const [isFavorite, setFavorite] = useState(false)
    const reviews = useMemo(() =>
        Array.from({ length: 20 }, (_, index) => ({
            id: index + 1,
            name: "Anonymous User",
            date: new Date(),
            title: "This song app is great!",
            review: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
        })), []
    );

    const onBack = () => {
        props.navigation.navigate('HomeScreen')
    }

    const onAddFavorite = (params: any) => {
        dispatch(addFavorite(params))
        setFavorite(true)
    }

    useEffect(() => {
        if (favorites) {
            const isFavorite = favorites.filter((val) => val.trackId == params.trackId).length > 0
            setFavorite(isFavorite);
        }
    }, [favorites, params.trackId, dispatch]);

    return (
        <SafeAreaView >
            <View style={{ backgroundColor: COLORS.PRIMARY, padding: 15, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Icon size={18} color={COLORS.SECONDARY} name="arrow-left" onPress={onBack} />
                <Text style={{ fontSize: 18, textTransform: 'capitalize', color: COLORS.SECONDARY, marginLeft: 10 }}>{params.kind.replace('-', ' ')}</Text>
            </View>
            <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#CCC', padding: 20 }}>
                    <Image source={{ uri: params.artworkUrl100 }} width={120} height={120} />
                    <View style={{ flex: 1, marginLeft: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 120 }}>
                        <View>
                            <Text style={{ fontSize: 20, color: COLORS.PRIMARY, textAlign: 'justify' }} numberOfLines={2}>{params.collectionName}</Text>
                            <Text style={{ color: '#555', fontSize: 14 }}>{params.artistName}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                            <View>
                                <Text style={{ color: '#555', fontSize: 14 }}>Release</Text>
                                <Text style={{ color: COLORS.PRIMARY }}>{formateDate(params.releaseDate)}</Text>
                            </View>
                            <Icon name="heart" color={isFavorite ? 'red' : COLORS.PRIMARY} size={20} onPress={() => onAddFavorite(params)} />
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: '#444', lineHeight: 23, textAlign: 'justify' }}>{params.longDescription}</Text>
                </View>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ backgroundColor: COLORS.PRIMARY, height: 175, borderRadius: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Icon size={20} color={COLORS.SECONDARY} name="backward" />
                            <Icon size={20} color={COLORS.SECONDARY} name="play" style={{ marginHorizontal: 25 }} />
                            <Icon size={20} color={COLORS.SECONDARY} name="forward" />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 20, color: COLORS.PRIMARY, marginTop: 20 }}>Reviews</Text>
                    {reviews && reviews.map((item,index) => (
                        <View key={item.id} style={{ marginTop: 20, backgroundColor: index % 2 == 0 ? '#EEE' : '', paddingVertical: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 17, marginVertical: 2, color: COLORS.PRIMARY }}>{item.title}</Text>
                                <Text style={{ color: '#555' }}>{new Date(item.date).toDateString()}</Text>
                            </View>
                            <Text style={{ marginVertical: 3, color: COLORS.PRIMARY }}>Oleh {item.name}</Text>
                            <Text style={{ color: '#888', fontSize: 13 }}>{item.review}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailScreen