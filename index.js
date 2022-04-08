const express = require("express");
const {queueManagerConnector, queueConnector, Queue} = require('ibmmq-facade');
const { XMLParser, XMLBuilder} = require("fast-xml-parser");let xml2json = require('xml2json');
const parseString = require('xml2js').parseString;
const axios = require('axios');


const config = {
    host: '10.30.223.134',
    port: '1413',
    user: 'MAN',
    password: 'Niagara2222',
    queueManagerName: 'MA_TEST_QMGR',
    channelName: 'MAN'
};

const processMessage = async function() {
try {
    // returns the queue manager handle object which must be passed in when connecting a queue
    const qmHandle = await queueManagerConnector.connect(config);

    const queueName = 'PHI_YMS_Queue';
    // returns a queue handle which must be passed to your queue data structure
    // when retrieving or sending messages
    const queueHandle = await queueConnector.connect(qmHandle, queueName);

    const buffer = queueManagerConnector.getConnectionOptions().ClientConn.MaxMsgLength;
    const queue = new Queue(queueHandle, buffer);

    while (queue.isMessages()) {
        await queue.dequeue().then(data => {
            let requestBody = [];
            for (const bit in data) {
                if (data[bit] > 0) {
                requestBody.push(String.fromCharCode(data[bit]));
                } else break;
            }

            const XMLdata = requestBody.join('');

            const parser = new XMLParser();
            let jObj = parser.parse(XMLdata);

            const builder = new XMLBuilder();
            const xmlContent = builder.build(jObj);
    
            parseString(xmlContent, function (err, result) {
                const taskObject = result.T_API_TASK_OBJECT;

                const azurePayload = 
            `{
                "action_code": "${taskObject.ACTION_CODE}",
                "org_id": "${taskObject.ORG}",
                "task_id": "${taskObject.TASK_ID}",
                "task_type": "${taskObject.TASK_TYPE}",
                "status": "${taskObject.STATUS}",
                "assigned_user_id": "${taskObject.ASSIGNED_USER_ID}",
                "created_source": "${taskObject.CREATED_SOURCE}",
                "created_datetime": "${taskObject.CREATED_DTTM}",
                "last_updated_datetime": "${taskObject.LAST_UPDATED_DTTM}",
                "last_updated_source": "${taskObject.LAST_UPDATED_SOURCE}",
                "priority": "${taskObject.PRIORITY}",
                "yard_id": "${taskObject.YARD_ID}",
                "task_start_datetime": "${taskObject.TASK_START_TIME}",
                "task_end_datetime": "${taskObject.TASK_END_TIME}",
                "task_release_datetime": "${taskObject.TASK_RELEASE_TIME}",
                "task_comments": "${taskObject.TASK_COMMENTS}",
                "trailer_id": "${taskObject.TRAILER_ID}",
                "trailer_name": "${taskObject.TRAILER_NAME}",
                "trailer_comments": "${taskObject.TRAILER_COMMENTS}",
                "carrier_company_name": "${taskObject.CARRIER_COMPANY_NAME}",
                "carrier_name": "${taskObject.CARRIER_NAME}",
                "audit_locn_type": "${taskObject.AUDIT_LOCN_TYPE}",
                "audit_locn_zone": "${taskObject.AUDIT_LOCN_ZONE}",
                "audit_locn_name": "${taskObject.AUDIT_LOCN_NAME}",
                "move_src_type": "${taskObject.MOVE_SRC_TYPE}",
                "move_src_zone": "${taskObject.MOVE_SRC_ZONE}",
                "move_src_name": "${taskObject.MOVE_SRC_NAME}",
                "move_dst_type": "${taskObject.MOVE_DST_TYPE}",
                "move_dst_zone": "${taskObject.MOVE_DST_ZONE}",
                "move_dst_name": "${taskObject.MOVE_DST_NAME}"
            }`;

            // console.log(azurePayload);

            const config = {
                method: 'post',
                url: 'https://nbl-yms-serverless-dev.azurewebsites.net/api/notifications?code=QhWx23PjHmzm67vNLwtTndfuZHhXBYNDukrPu1OZwKAvSvPRWuFkaQ==',
                headers: { 
                  'Authorization': 'Bearer eyJraWQiOiIxNDU1NjE0MDIyIiwiYWxnIjoiUlMyNTYiLCJ0eXAiOiJKV1QifQ.eyJjb25jdXIuc2NvcGVzIjpbIm9wZW5pZCIsInJlY2VpcHRzLnJlYWQiLCJyZWNlaXB0cy53cml0ZSIsInJlY2VpcHRzLndyaXRlb25seSIsInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJjb21wYW55LnJlYWQiLCJjb21wYW55LndyaXRlIiwiY3JlZGl0Y2FyZGFjY291bnQucmVhZCIsInRyYXZlbHJlcXVlc3Qud3JpdGUiLCJtaWxlYWdlLmpvdXJuZXkucmVhZCIsIm1pbGVhZ2Uuam91cm5leS53cml0ZW9ubHkiLCJtaWxlYWdlLnZlaGljbGUucmVhZCIsIm1pbGVhZ2UudmVoaWNsZS53cml0ZW9ubHkiLCJtaWxlYWdlLnJhdGUucmVhZCIsIm1pbGVhZ2UucmF0ZS53cml0ZW9ubHkiLCJ1c2VyX3JlYWQiLCJBVFRFTkQiLCJDT05GSUciLCJDT05SRVEiLCJFUkVDUFQiLCJFVlMiLCJFWFBSUFQiLCJDQ0FSRCIsIkJBTksiLCJFWFRSQ1QiLCJGSVNWQyIsIkZPUCIsIkdIT1NUIiwiSU1BR0UiLCJJTlNHSFQiLCJJTlZQTVQiLCJJTlZQTyIsIklOVlRWIiwiSU5WVkVOIiwiSVRJTkVSIiwiSk9CTE9HIiwiTElTVCIsIk1UTkciLCJOT1RJRiIsIlBBWUJBVCIsIlJDVElNRyIsIlNVUFNWQyIsIlRBWElOViIsIlRSVlBSRiIsIlBBU1NWIiwiQ09NUEQiLCJFTUVSRyIsIlRTQUkiLCJUTUNTUCIsIk1FRElDIiwiVU5VVFgiLCJUUlZQVFMiLCJUUlZSRVEiLCJUV1MiLCJVU0VSIiwiQ09NUEFOWSJdLCJhdWQiOiIqIiwiY29uY3VyLnByb2ZpbGUiOiJodHRwczovL3VzLmFwaS5jb25jdXJzb2x1dGlvbnMuY29tL3Byb2ZpbGUvdjEvcHJpbmNpcGFscy9iZmIyNDQyNi01Nzc5LTQ0MjAtYWY5ZS1kNWIzYWUyNGFiNzMiLCJjb25jdXIudmVyc2lvbiI6MywiY29uY3VyLnR5cGUiOiJ1c2VyIiwiY29uY3VyLmFwcCI6Imh0dHBzOi8vdXMuYXBpLmNvbmN1cnNvbHV0aW9ucy5jb20vcHJvZmlsZS92MS9hcHBzLzhmM2FmNDAzLTY3MTctNGE5OS04ZWE3LThmOGQ1YjNlZmIwZCIsInN1YiI6ImJmYjI0NDI2LTU3NzktNDQyMC1hZjllLWQ1YjNhZTI0YWI3MyIsImlzcyI6Imh0dHBzOi8vdXMuYXBpLmNvbmN1cnNvbHV0aW9ucy5jb20iLCJleHAiOjE2NDYzMzg2OTcsImNvbmN1ci5hcHBJZCI6IjhmM2FmNDAzLTY3MTctNGE5OS04ZWE3LThmOGQ1YjNlZmIwZCIsIm5iZiI6MTY0NjMzNTA4NywiaWF0IjoxNjQ2MzM1MDk3LCJjb25jdXIuY29tcGFueSI6ImMzM2FjMjBhLWQ5YjctNDhkNi05YjRjLTcwNGVkZDg5NWZhYiJ9.SRaNKqmSshxN_2E3vRhPtftlllH9muRQ87w_QWHj8fC2OsXXhjQKWmXLMdNxGpTBVuwXsKyhP3uwPtFnEvVFDpee6LRykbtsLtBCD7_jvAi4Ufz6ouA8ChNbw2yNhvzC7u5W_nX-1iwuhigGMi5wXwdqOofT-vEuhyoiJLpV7V-JiQhPRw-t7IG3RZ8bfvTYB9FTSo_c1akYnAGvD1Pc4ujSJeidnbLZNGfjCYsZNzDwsj_0bWRq1KZeI0VfFoe_b1Z2wbrYSZ3KrOSV_s13T-5H7BiJlxOi0LuWAg1BftPydDuoVW9YABKq3N34fViDIZ1AovP2QGvHCZb28uxnWw', 
                  'Content-Type': 'application/json'
                },
                data : azurePayload
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });

            });            
        });
    }
} catch (error) {
    return false;
} finally {
    queueConnector.clean();
    queueManagerConnector.clean();
}
};

setInterval(processMessage, 2000);


