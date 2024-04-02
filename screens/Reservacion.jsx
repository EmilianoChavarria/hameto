import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

export default function Reservacion() {
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [openEndDatePicker, setOpenEndDatePicker] = useState(false);
    const today = new Date();

    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), "yyyy-mm-dd");
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [selectedEndDate, setSelectedEndDate] = useState("");
    const [startedDate, setStartedDate] = useState("");
    const [endedDate, setEndedDate] = useState("");

    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }

    function handleChangeEndDate(propDate) {
        setEndedDate(propDate);
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    const handleOnPressEndDate = () => {
        setOpenEndDatePicker(!openEndDatePicker);
    };

    const handleOnCloseStartDatePicker = () => {
        setOpenStartDatePicker(false);
    };

    const handleOnCloseEndDatePicker = () => {
        setOpenEndDatePicker(false);
    };

    return (
        <View className="flex-1 justify-center">
            <TouchableOpacity className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-14" onPress={handleOnPressStartDate} style={{ borderBottomWidth: 2, borderColor: '#4181E1' }}>
                <Text>
                    {selectedStartDate}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-14" onPress={handleOnPressEndDate} style={{ borderBottomWidth: 2, borderColor: '#4181E1' }}>
                <Text>
                    {selectedEndDate}
                </Text>
            </TouchableOpacity>
            <Modal animationType="slide" transparent={true} visible={openStartDatePicker || openEndDatePicker}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: '#429aba', alignItems: 'center', justifyContent: 'center', borderRadius: 20, padding: 10, width: '90%',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}>
                        {openStartDatePicker && (
                            <DatePicker
                                mode='calendar'
                                minimumDate={null}
                                selected={startedDate}
                                onDateChanged={handleChangeStartDate}
                                onSelectedChange={date => setSelectedStartDate(date)}
                                options={{
                                    backgroundColor: '#429aba',
                                    textHeaderColor: '#ffffff',
                                    textDefaultColor: '#ffffff',
                                    selectedTextColor: '#fff',
                                    mainColor: '#fbc816',
                                    textSecondaryColor: '#FFFFFF',
                                    borderColor: '#fbc816',
                                    textDayFontSize: 20,
                                    textMonthFontSize: 20,
                                    textYearFontSize: 20,
                                    showYearPicker: true,
                                    locale: 'es',
                                }}
                            />
                        )}
                        {openEndDatePicker && (
                            <DatePicker
                                mode='calendar'
                                minimumDate={null}
                                selected={endedDate}
                                onDateChanged={handleChangeEndDate}
                                onSelectedChange={date => setSelectedEndDate(date)}
                                options={{
                                    backgroundColor: '#429aba',
                                    textHeaderColor: '#ffffff',
                                    textDefaultColor: '#ffffff',
                                    selectedTextColor: '#fff',
                                    mainColor: '#fbc816',
                                    textSecondaryColor: '#FFFFFF',
                                    borderColor: '#fbc816',
                                    textDayFontSize: 20,
                                    textMonthFontSize: 20,
                                    textYearFontSize: 20,
                                    showYearPicker: true,
                                    locale: 'es',
                                }}
                            />
                        )}

                        <TouchableOpacity onPress={handleOnCloseStartDatePicker} className="border border-[#fbc816] w-16 h-10 rounded-xl">
                            <Text className="text-center" style={{ color: 'white', marginTop: 10 }}>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOnCloseEndDatePicker} className="border border-[#fbc816] w-16 h-10 rounded-xl">
                            <Text className="text-center" style={{ color: 'white', marginTop: 10 }}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
