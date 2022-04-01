class RoomDto {
  id;
  topic;
  speakers;
  ownerId;
  constructor(room) {
    this.id = room._id;
    this.topic = room.topic;
    this.ownerId = room.ownerId;
    this.speakers = room.speakers;
  }
}
module.exports = RoomDto;
