
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { es } from 'date-fns/locale';
import { ThemeModeContext } from '../../../contexts/ViewsProvider';
import { Chart_90 } from '../../styled/Charts';

const locales = {
    es: es,
};
const fechaOriginal = "2025-04-15 11:36:40.613";

// Parseamos usando el formato exacto
const fechaFormateada = parse(fechaOriginal, 'yyyy-MM-dd HH:mm:ss.SSS', new Date());


const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const events = [
    {
        title: 'Evento de prueba',
        start: new Date(),
        end: new Date(),
    },
];

export default function Chart_Observations() {

    const [themeMode] = useContext(ThemeModeContext);

    useEffect(() => {
        console.log(fechaFormateada);
    },[])
    return (
        <>
            <Chart_90 ThemeMode={themeMode}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '90vh' }}
                    culture="es"
                />
            </Chart_90>
        </>
    );
}