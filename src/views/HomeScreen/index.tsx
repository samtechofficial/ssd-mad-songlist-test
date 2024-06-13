import React, { useEffect, useState } from "react";
import { Dimensions, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as API from '../../api/app';
import StatusBar from "../../components/StatusBar";
import { COLORS } from "../../helper/colors";
import { getYear } from "../../helper/utils";

const HomeScreen = (props: any) => {
    const [playList, setPlayList] = useState<any>(null)
    const WIDTH = Dimensions.get('screen').width
    const [search, setSearch] = useState<any>('jack johnson')

    useEffect(() => {
        getItems(search, 30)
    }, [])

    const getItems = async (search: any, limit: any) => {
        try {
            const { data } = await API.APIGetItems(search, limit)
            if (data) {
                setPlayList(data.results)
            }
        } catch (error) {

        }
    }

    const onOpenDetail = (params: any) => {
        props.navigation.navigate('DetailScreen', params)
    }

    const onOpenFavorites = () => {
        props.navigation.navigate('FavoriteScreen')
    }

    const onSearch = () => {
        if (search.trim() !== '') {
            const searchQuery = search.split(' ').join('+');
            getItems(searchQuery, 30);
          }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar bgColor={COLORS.PRIMARY} />
            <View style={{ display: 'flex', flexDirection: 'row', padding: 10, backgroundColor: COLORS.PRIMARY, alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10, backgroundColor: COLORS.PRIMARY, alignItems: 'center' }}>
                    <Icon size={22} name="play-circle" color={COLORS.SECONDARY} />
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.SECONDARY }}> SAMTECH </Text>
                    <Text style={{ fontSize: 22, fontWeight: '100', color: COLORS.SECONDARY }}> PLAY </Text>
                </View>
                <Icon size={22} name="heart" color={COLORS.SECONDARY} onPress={onOpenFavorites} />
            </View>
            <View style={{ marginVertical: 10, paddingHorizontal: 5, display: 'flex', flexDirection: 'row' }}>
                <TextInput
                    placeholder="Cari disini ..."
                    value={search}
                    onChangeText={text => setSearch(text)} style={{ fontSize: 15, backgroundColor: '#DDD', flex: 1, borderRadius: 3, height:45 }} />
                <TouchableOpacity activeOpacity={0.8} onPress={onSearch}>
                    <View style={{ backgroundColor: COLORS.PRIMARY, width: 100, borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height:45 }}>
                        <Text style={{ color: COLORS.SECONDARY, fontSize: 15, }}>Search</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 10, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <View style={{ marginBottom: 10, backgroundColor: COLORS.PRIMARY, borderRadius: 3, padding: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: COLORS.SECONDARY, paddingHorizontal: 5 }}>PLAY MUSIC</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {playList && playList.length > 0 ? playList.map((item: { artworkUrl100: any; country: string; releaseDate: string; collectionName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => (
                            <TouchableOpacity activeOpacity={0.8} onPress={() => onOpenDetail(item)} key={idx}>
                                <View style={{ padding: 2 }}>
                                    <View style={{ backgroundColor: '#EEE', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', borderRadius: 3, position: 'relative' }}>
                                        <Image source={{ uri: item.artworkUrl100 }} width={WIDTH / 3 - 15} height={WIDTH / 3 - 15} style={{ borderRadius: 3 }} />
                                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 3, overflow: 'hidden' }}>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ backgroundColor: COLORS.PRIMARY, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 5, opacity: 0.7 }}>
                                                    <Text style={{ fontSize: 13, color: COLORS.SECONDARY, textTransform: 'uppercase' }}>{item.country}</Text>
                                                </View>
                                                <View style={{ backgroundColor: COLORS.PRIMARY, padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 5 }}>
                                                    <Text style={{ color: COLORS.SECONDARY }}>{getYear(item.releaseDate)}</Text>
                                                </View>
                                            </View>
                                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 5 }}>
                                                <Text style={{ fontSize: 15, textAlign: 'center', color: COLORS.SECONDARY }} numberOfLines={3}>{item.collectionName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )) : (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
                                <Text style={{ color: COLORS.PRIMARY }}>Tidak Ada Playlist Yang Tersedia</Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen