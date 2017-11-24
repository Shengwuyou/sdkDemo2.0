package test;

/**
 * Created by 小沙弥 on 2017/6/6.
 */
public class ThreadTest {
    private int number=1;
    private boolean flag=false;

    private void write(){
        flag=true;
        number=2;
    }
    private void read(){
        int resoult=0;
        if (flag){
            resoult=number*2;
        }
        System.out.println(resoult);
    }
    private class InThread extends Thread{
        @Override
        public void run() {

        }
    String a="{\"tables\":[{\"index\":1,\"table\":[{\"1\":\"测测009\",\"2\":\"411324199006094032\",\"3\":\"男\",\"4\":\"汉\",\"5\":\"18300010010\",\"6\":\"好\"}]}],\"${YK_NAME}\":\"吴晓\",\"${YK_ZJ_NUMBER}\":\"411324199006094041\",\"${YK_PHONE}\":\"18368046072\",\"${YK_ADDRESS}\":\"吴伟伟\",\"${YK_POSTCODE}\":\"2310010\",\"${LXS_NAME}\":\"合肥国际旅行社49\",\"${LXS_ADDRESS}\":\"合肥市黄山路118号\",\"${LXS_LICENSE}\":\"L-AH-100003\",\"${LXS_HANDLER_MOBILE}\":\"17706712105\",\"${EXIT_DATE}\":\"2017-08-01\",\"${ENTRY_DATE}\":\"2017-08-01\",\"${DAYS}\":\"1\",\"${ADULT_COST}\":\"1\",\"${CHILDREN_COST}\":\"1\",\"${SERVICE_CHARGE_UNIT}\":\"1\",\"${TOTAL_COST}\":\"1\",\"${PAY_DATE}\":\"2017-08-01\",\"${TYPE}\":\"0\",\"${PRODUCT_NAME}\":\"\",\"${LEAST_NUM}\":\"1\",\"${SOLVE_WAY}\":\"0\",\"${DISPUTE_DEAL_WAY}\":\"1\",\"${TRIBUNAL_NAME}\":\"\",\"${ADDITION_CONTENT}\":\"\",\"imags\":[{\"${IMG_1}\":{\"width\":\"32\",\"height\":\"32\",\"imgType\":\"png\",\"content\":\"CC\"}}],\"${IMG_6}\":\"\",\"${IMG_5}\":\"\",\"${IMG_4}\":\"\",\"${IMG_3}\":\"\",\"${IMG_2}\":\"\",\"${DEFCONTRACTNO}\":\"EG310QPcui41\"}\t";
    }

}
