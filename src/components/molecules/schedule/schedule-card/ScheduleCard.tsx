import { BellIcon, DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons';
import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import { NOTIFICATION_OPTIONS } from '@/constants/notification';
import { Event } from '@/types';

interface ScheduleCardProps {
  event: Event;
  notifiedEvents: string[];
  handleEditEvent: (event: Event) => void;
  handleDeleteEvent: (eventId: string) => void;
}
export const ScheduleCard = ({
  event,
  notifiedEvents,
  handleEditEvent,
  handleDeleteEvent,
}: ScheduleCardProps) => {
  return (
    <Box
      key={event.id}
      data-testid={`event-item-${event.id}`}
      borderWidth={1}
      borderRadius="lg"
      p={3}
      width="100%"
    >
      <HStack justifyContent="space-between">
        <VStack align="start">
          <HStack>
            {notifiedEvents.includes(event.id) ? (
              <BellIcon color="red.500" />
            ) : event.repeat.type !== 'none' ? (
              <RepeatIcon color="blue.500" />
            ) : null}
            <Text
              fontWeight={notifiedEvents.includes(event.id) ? 'bold' : 'normal'}
              color={
                notifiedEvents.includes(event.id)
                  ? 'red.500'
                  : event.repeat.type !== 'none'
                    ? 'blue.500'
                    : 'inherit'
              }
            >
              {event.title}
            </Text>
          </HStack>
          <Text>{event.date}</Text>
          <Text>
            {event.startTime} - {event.endTime}
          </Text>
          <Text>{event.description}</Text>
          <Text>{event.location}</Text>
          <Text>카테고리: {event.category}</Text>
          {event.repeat.type !== 'none' && (
            <Text>
              반복: {event.repeat.interval}
              {event.repeat.type === 'daily' && '일'}
              {event.repeat.type === 'weekly' && '주'}
              {event.repeat.type === 'monthly' && '월'}
              {event.repeat.type === 'yearly' && '년'}
              마다
              {event.repeat.endDate && ` (종료: ${event.repeat.endDate})`}
            </Text>
          )}
          <Text>
            알림:{' '}
            {NOTIFICATION_OPTIONS.find((option) => option.value === event.notificationTime)?.label}
          </Text>
        </VStack>
        <HStack>
          <IconButton
            aria-label="Edit event"
            icon={<EditIcon />}
            onClick={() => handleEditEvent(event)}
          />
          <IconButton
            aria-label="Delete event"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteEvent(event.id)}
          />
        </HStack>
      </HStack>
    </Box>
  );
};
