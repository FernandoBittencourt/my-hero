import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Hi ${incident.name}, I am getting in touch, because I am looking to help with the ${incident.title} incident with a value of ${Intl.NumberFormat('en-US', { style:'currency', currency:'USD' },).format(incident.value)}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject:`Hero of incident: ${incident.title}`,
            recipients: [incident.email],
            body: message
        });
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82043"></Feather>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>NGO:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city} ({incident.state})</Text>
                    
                <Text style={styles.incidentProperty}>INCIDENT:</Text>
                <Text style={[styles.incidentValue]}><Text style={[styles.incidentValue,{fontWeight: 'bold'}]}>{incident.title}:</Text> {incident.description}</Text>
                    
                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('en-US', { style:'currency', currency:'USD' },).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero of this incident.</Text>
               
                <Text style={styles.heroDescription}>Contact:</Text>
               
               <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
               </View>
            </View>
        </View>
    );
}