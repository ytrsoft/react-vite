// mock/user.ts
import Mock from "mockjs";
var userList = Mock.mock({
  "list|200000": [
    {
      "id|+1": 1,
      name: "@cname",
      age: "@integer(18, 60)",
      email: "@email"
    }
  ]
});
var userMock = [
  {
    url: "/api/users",
    method: "get",
    response: () => ({
      code: 200,
      message: "success",
      data: userList.list
    })
  }
];
var user_default = userMock;
export {
  user_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibW9jay91c2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIkM6XFxcXFVzZXJzXFxcXDE2NTQ0XFxcXERlc2t0b3BcXFxccmVhY3Qtdml0ZVxcXFxtb2NrXFxcXHVzZXIudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiQzpcXFxcVXNlcnNcXFxcMTY1NDRcXFxcRGVza3RvcFxcXFxyZWFjdC12aXRlXFxcXG1vY2tcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL0M6L1VzZXJzLzE2NTQ0L0Rlc2t0b3AvcmVhY3Qtdml0ZS9tb2NrL3VzZXIudHNcIjtpbXBvcnQgeyBNb2NrTWV0aG9kIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcclxuaW1wb3J0IE1vY2sgZnJvbSAnbW9ja2pzJ1xyXG5cclxuY29uc3QgdXNlckxpc3QgPSBNb2NrLm1vY2soe1xyXG4gICdsaXN0fDIwMDAwMCc6IFtcclxuICAgIHtcclxuICAgICAgJ2lkfCsxJzogMSxcclxuICAgICAgbmFtZTogJ0BjbmFtZScsXHJcbiAgICAgIGFnZTogJ0BpbnRlZ2VyKDE4LCA2MCknLFxyXG4gICAgICBlbWFpbDogJ0BlbWFpbCdcclxuICAgIH1cclxuICBdXHJcbn0pXHJcblxyXG5jb25zdCB1c2VyTW9jazogTW9ja01ldGhvZFtdID0gW1xyXG4gIHtcclxuICAgIHVybDogJy9hcGkvdXNlcnMnLFxyXG4gICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgIHJlc3BvbnNlOiAoKSA9PiAoe1xyXG4gICAgICBjb2RlOiAyMDAsXHJcbiAgICAgIG1lc3NhZ2U6ICdzdWNjZXNzJyxcclxuICAgICAgZGF0YTogdXNlckxpc3QubGlzdFxyXG4gICAgfSlcclxuICB9XHJcbl1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJNb2NrXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFVBQVU7QUFFakIsSUFBTSxXQUFXLEtBQUssS0FBSztBQUFBLEVBQ3pCLGVBQWU7QUFBQSxJQUNiO0FBQUEsTUFDRSxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxPQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsSUFBTSxXQUF5QjtBQUFBLEVBQzdCO0FBQUEsSUFDRSxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixVQUFVLE9BQU87QUFBQSxNQUNmLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULE1BQU0sU0FBUztBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxlQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
