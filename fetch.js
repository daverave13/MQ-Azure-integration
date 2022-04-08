var axios = require('axios');
var data = JSON.stringify({
  "action_code": "",
  "org_id": "109",
  "task_id": "927269",
  "task_type": "Audit",
  "status": "Released",
  "assigned_user_id": "",
  "created_source": "DAILYTASKS",
  "created_datetime": "2022-03-21 00:44",
  "last_updated_datetime": "2022-03-21 00:44",
  "last_updated_source": "DAILYTASKS",
  "priority": "40",
  "yard_id": "PHI",
  "task_start_datetime": "",
  "task_end_datetime": "",
  "task_release_datetime": "2022-03-21 00:44",
  "task_comments": "",
  "trailer_id": "1035043",
  "trailer_name": "2188877",
  "trailer_comments": "Live Load waiting for Door. Please contact driver at 7145622369 on how to proceed. ",
  "carrier_company_name": "LAZER SPOT INC.",
  "carrier_name": "LSPI",
  "audit_locn_type": "Yard",
  "audit_locn_zone": "PHI",
  "audit_locn_name": "Yard 10",
  "move_src_type": "",
  "move_src_zone": "",
  "move_src_name": "",
  "move_dst_type": "",
  "move_dst_zone": "",
  "move_dst_name": ""
});

var config = {
  method: 'post',
  url: 'https://nbl-yms-serverless-dev.azurewebsites.net/api/notifications?code=QhWx23PjHmzm67vNLwtTndfuZHhXBYNDukrPu1OZwKAvSvPRWuFkaQ==',
  headers: { 
    'Authorization': 'Bearer eyJraWQiOiIxNDU1NjE0MDIyIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJjb25jdXIuc2NvcGVzIjpbIm9wZW5pZCIsInJlY2VpcHRzLnJlYWQiLCJyZWNlaXB0cy53cml0ZSIsInJlY2VpcHRzLndyaXRlb25seSIsInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJjb21wYW55LnJlYWQiLCJjb21wYW55LndyaXRlIiwiY3JlZGl0Y2FyZGFjY291bnQucmVhZCIsInRyYXZlbHJlcXVlc3Qud3JpdGUiLCJtaWxlYWdlLmpvdXJuZXkucmVhZCIsIm1pbGVhZ2Uuam91cm5leS53cml0ZW9ubHkiLCJtaWxlYWdlLnZlaGljbGUucmVhZCIsIm1pbGVhZ2UudmVoaWNsZS53cml0ZW9ubHkiLCJtaWxlYWdlLnJhdGUucmVhZCIsIm1pbGVhZ2UucmF0ZS53cml0ZW9ubHkiLCJ1c2VyX3JlYWQiLCJBVFRFTkQiLCJDT05GSUciLCJDT05SRVEiLCJFUkVDUFQiLCJFVlMiLCJFWFBSUFQiLCJDQ0FSRCIsIkJBTksiLCJFWFRSQ1QiLCJGSVNWQyIsIkZPUCIsIkdIT1NUIiwiSU1BR0UiLCJJTlNHSFQiLCJJTlZQTVQiLCJJTlZQTyIsIklOVlRWIiwiSU5WVkVOIiwiSVRJTkVSIiwiSk9CTE9HIiwiTElTVCIsIk1UTkciLCJOT1RJRiIsIlBBWUJBVCIsIlJDVElNRyIsIlNVUFNWQyIsIlRBWElOViIsIlRSVlBSRiIsIlBBU1NWIiwiQ09NUEQiLCJFTUVSRyIsIlRTQUkiLCJUTUNTUCIsIk1FRElDIiwiVU5VVFgiLCJUUlZQVFMiLCJUUlZSRVEiLCJUV1MiLCJVU0VSIiwiQ09NUEFOWSJdLCJhdWQiOiIqIiwiY29uY3VyLnByb2ZpbGUiOiJodHRwczovL3VzLmFwaS5jb25jdXJzb2x1dGlvbnMuY29tL3Byb2ZpbGUvdjEvcHJpbmNpcGFscy9iZmIyNDQyNi01Nzc5LTQ0MjAtYWY5ZS1kNWIzYWUyNGFiNzMiLCJjb25jdXIudmVyc2lvbiI6MywiY29uY3VyLnR5cGUiOiJ1c2VyIiwiY29uY3VyLmFwcCI6Imh0dHBzOi8vdXMuYXBpLmNvbmN1cnNvbHV0aW9ucy5jb20vcHJvZmlsZS92MS9hcHBzLzhmM2FmNDAzLTY3MTctNGE5OS04ZWE3LThmOGQ1YjNlZmIwZCIsInN1YiI6ImJmYjI0NDI2LTU3NzktNDQyMC1hZjllLWQ1YjNhZTI0YWI3MyIsImlzcyI6Imh0dHBzOi8vdXMuYXBpLmNvbmN1cnNvbHV0aW9ucy5jb20iLCJleHAiOjE2NDYzMzg2OTcsImNvbmN1ci5hcHBJZCI6IjhmM2FmNDAzLTY3MTctNGE5OS04ZWE3LThmOGQ1YjNlZmIwZCIsIm5iZiI6MTY0NjMzNTA4NywiaWF0IjoxNjQ2MzM1MDk3LCJjb25jdXIuY29tcGFueSI6ImMzM2FjMjBhLWQ5YjctNDhkNi05YjRjLTcwNGVkZDg5NWZhYiJ9.SRaNKqmSshxN_2E3vRhPtftlllH9muRQ87w_QWHj8fC2OsXXhjQKWmXLMdNxGpTBVuwXsKyhP3uwPtFnEvVFDpee6LRykbtsLtBCD7_jvAi4Ufz6ouA8ChNbw2yNhvzC7u5W_nX-1iwuhigGMi5wXwdqOofT-vEuhyoiJLpV7V-JiQhPRw-t7IG3RZ8bfvTYB9FTSo_c1akYnAGvD1Pc4ujSJeidnbLZNGfjCYsZNzDwsj_0bWRq1KZeI0VfFoe_b1Z2wbrYSZ3KrOSV_s13T-5H7BiJlxOi0LuWAg1BftPydDuoVW9YABKq3N34fViDIZ1AovP2QGvHCZb28uxnWw', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});