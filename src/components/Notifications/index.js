import React, { useState, useEffect } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale/pt';

import api from '~/services/api';
import {
    Container,
    Badge,
    NotificationList,
    Notification,
    Scroll,
} from './styles';

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function loadNotifications() {
            const response = await api.get('notifications');
            const data = response.data.map(notification => ({
                ...notification,
                timeDistance: formatDistance(
                    parseISO(notification.createdAt),
                    new Date(),
                    { addSuffix: true, locale: pt }
                ),
            }));
            setNotifications(data);
        }
        loadNotifications();
    }, []);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>
            <NotificationList visible={visible}>
                <Scroll>
                    <Notification unread>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                    <Notification>
                        <p>Novo agendamento</p>
                        <time>há 2 dias</time>
                        <button type="button">Marcar como lida</button>
                    </Notification>
                </Scroll>
            </NotificationList>
        </Container>
    );
}
