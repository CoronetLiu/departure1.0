/**
 * 拓扑转换工具以及缓存工具
 * */
const nodePropertys = ['x', 'y', 'image', 'w', 'h', 'name', 'id', 'font', 'color'];
const linkPropertys = ['fromId', 'toId', 'id', 'name', 'color', 'w'];
const groupPropertys = ['id', 'name', 'x', 'y', 'w', 'h', 'children'];
const cachMap = new Map();
const jcachMap = new Map();

function addCache(id, value) {
    cachMap.set(id, value);
}
function getCache(id) {
    if (cachMap.has(id)) {
        return cachMap.get(id);
    } else {
        console.log('查找的Id=%s不存在', id);
    }
    return null;
}

function getJCache(id) {
    if (jcachMap.has(id)) {
        return jcachMap.get(id);
    } else {
        console.log('查找的Id=%s不存在', id);
    }
    return null;
}

function clear() {
    let keys = cachMap.keys();
    let keyNum = keys.size;
    for (let keyIndex = 0; keyIndex < keyNum; keyIndex++) {
        let v = cachMap.get(keyNum[keyIndex]);
        v = null;
    }
    cachMap.clear();


    let jkeys = cachMap.keys();
    let jkeyNum = jkeys.size;
    for (let jkeyIndex = 0; jkeyIndex < jkeyNum; jkeyIndex++) {
        let jv = jcachMap.get(jkeyNum[jkeyIndex]);
        jv = null;
    }
    jcachMap.clear();
}

/****
 * 创建节点
 * @param node
 * @param scene
 */
function convertNode(scene, node) {
    if (!scene) {
        console.error('场景不存在,请创建');
    }
    if (!node) {
        console.error('节点数据为空,请确认');
    }
    // if (!hasPropertyByArray(node, nodePropertys)) {
    //     console.error('节点的必要属性为空,请确认');
    // }

    //创建一个节点
    let jnode = new JTopo.Node(node.name);
    //根据x，y定义页面显示位置（设置节点坐标）
    jnode.setLocation(node.x, node.y);
    //根据w，h定义数据显示大小
    jnode.setSize(node.w, node.h);
    //随机id
    jnode.id = node.id;
    //字体颜色
    jnode.fontColor = node.color;
    //字体设置
    jnode.font = node.font;

    //是否可拖动
    jnode.dragable = false;
    //设置背景图
    jnode.setImage(node.image);
    jnode.canDrill = node.canDrill;
    //设置为缓存
    addCache(node.id, node);
    jcachMap.set(node.id, jnode);
    //放入到场景中
    scene.add(jnode);
    return jnode;
}

/**
 *
 * @param scene
 * @param node
 * @param radius
 * @param color
 * @returns
 */
function convertCircleNode(scene, node, radius) {
    if (!scene) {
        console.error('场景不存在,请创建');
    }
    if (!node) {
        console.error('节点数据为空,请确认');
    }
    // if (!hasPropertyByArray(node, nodePropertys)) {
    //     console.error('节点的必要属性为空,请确认');
    // }
    let circleNode = new JTopo.CircleNode('');
    //圆点半径
    circleNode.radius = radius;
    //透明度
    circleNode.alpha = 0.7;
    //填充颜色
    circleNode.fillColor = '127, 255, 0';
    //根据设置的布局控制圆点位置
    circleNode.setLocation(node.x, node.y);
    //添加缓存
    addCache(node.id, node);
    jcachMap.set(node.id, circleNode);
    scene.add(circleNode);
    return circleNode;
}

/***
 * 创建连线
 * @param link
 * @param scene
 */
function convertLink(scene, link) {
    if (!scene) {
        console.error('场景不存在,请创建');
    }
    if (!link) {
        console.error('连线数据为空,请确认');
    }
    if (!hasPropertyByArray(link, linkPropertys)) {
        console.error('连线的必要属性为空,请确认');
    }
    let nodeA = getJCache(link.fromId);
    let nodeB = getJCache(link.toId);
    if (nodeA && nodeB) {
        var jlink = new JTopo.Link(nodeA, nodeB, link.name);
        jlink.lineWidth = link.w;
        jlink.bundleOffset = 60;
        jlink.bundleGap = 20;
        jlink.textOffsetY = 3;
        jlink.strokeColor = link.color;
        jlink.id = link.id;
        cachMap.set(link.id, link);
        jcachMap.set(link.id, jlink);
        scene.add(jlink);
    }
    return jlink;
}

/****
 * 创建分组
 * @param node
 * @param child
 * @param scene
 */
function convertGroup(scene, node, child) {

}
/***
 * 根据Id获取节点
 * @param scene
 * @param nodeId
 */
function findById(scene, nodeId) {
    if (!scene) {
        console.error('场景不存在,请创建');
    }
    let r = {};
    scene.findElements((e) => {
        if (e.id == nodeId) {
            r = e;
            return e;
        }
        return null;
    });
    return r;
}

/***
 * 根据id上告警
 * @param level
 * @param id
 */
function addAlarm(scene, level, id) {
    if (!scene) {
        console.error('场景不存在,请创建');
    }
    let node = findById(scene, id);
    node.alarm = level;
}

/***
 * 批量判断属性是否存在
 * @param value
 * @param propertys
 * @returns {boolean}
 */
function hasPropertyByArray(value, propertys) {
    let result = true;
    if (value && propertys) {
        let num = propertys.length;
        for (let index = 0; index < num; index++) {
            if (!value.hasOwnProperty(propertys[index])) {
                result = false;
                return result;
            }
        }
    }
    return result;
}

function getEventPosition(ev){
    var x,y;
    if(ev.layerX || ev.layerX == 0){
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {x: x, y: y};
}




function topTitle(content,imageBaseUrl,that,flagSx,flagSy,c,colGap,flagRGap){
    let img = new Image();
    img.src = imageBaseUrl + '/images/room/top_title.png';
    img.onload = () =>{
        that.state.context.drawImage(img,flagSx + c * colGap + 5+3, flagSy - flagRGap - 5,colGap - 6,flagRGap);
        that.state.context.fillStyle = 'black';
        that.state.context.font = '20px 微软雅黑';
        that.state.context.textAlign = 'center';
        //标题栏写入数值
        that.state.context.fillText(content, flagSx + (c + 0.5) * colGap, flagSy - (flagRGap / 2) + 2);
    }
}

function leftTitle(content,imageBaseUrl,that,flagSx,flagSy,r,rowGap,flagRGap,flagCGap){
    let img = new Image();
    img.src = imageBaseUrl + '/images/room/left_title.png';
    img.onload = () =>{
        that.state.context.drawImage(img,flagSx - flagRGap - 5, flagSy + r * rowGap + 3,img.width,rowGap - 6);
        that.state.context.font = '20px 微软雅黑';
        that.state.context.fillStyle = 'black';
        that.state.context.textAlign = 'center';
        that.state.context.fillText(content, flagSx - (flagCGap / 2) - 5, flagSy + (r + 0.5) * rowGap);
    }
}

function loadRack(img,imageBaseUrl,flagSx,item,colGap,flagSy,rowGap,device,scalRate,that,cabinetName,color){
    let deviceimg = new Image();
    deviceimg.onload = () => {
        let rackNode = {};
        rackNode.x = flagSx + ((item.deviceColumn - 1) * colGap  + 15);
        let number = 0;
        if(deviceimg.height > 500 && deviceimg.height < 800){
            number = 165;
        }else if(deviceimg.height > 800){
            number = 154;
        }else{
            number = 159;
        }
        rackNode.y = flagSy + item.deviceRow * rowGap + (2.8 * ( 47 - device.BOTTOM_UNIT) - number) * scalRate;
        rackNode.w = 48 * scalRate;
        rackNode.h = deviceimg.height * 0.04 * scalRate;
        rackNode.id = device.OBJECTID;
        rackNode.image = imageBaseUrl+'/device/'+device.OBJECTTYPE+'/' + device.OBJECTTYPE + '.png';
        rackNode.canDrill = true;
        rackNode.mouseevent = true;
        rackNode.message = true;
        rackNode.resId = device.OBJECTID;
        convertNode(that.state.roomScene,rackNode);
    }
    deviceimg.src = imageBaseUrl+'/device/'+device.OBJECTTYPE+'/'+ device.OBJECTTYPE + '.png';

    img.src = imageBaseUrl+'/images/room/room_rack_0.png';
    img.onload = () => {
        let room = {};
        //机架id  RACT1
        room.id = item.devicePrimkey;
        //机架所属类型
        room.type = 'room';
        room.canDrill = true;
        //机架图片
        room.image = imageBaseUrl+'/images/room/room_rack_0.png';
        //布局x
        room.x = flagSx + (item.deviceColumn - 1) * colGap  + 10;
        //布局y
        room.y = flagSy + (item.deviceRow - 1) * rowGap + 5;
        //图片高度
        room.h = img.height * scalRate;
        //图片宽度
        room.w = img.width * scalRate;
        //机架名字
        room.name = cabinetName;
        room.font = '14px 微软雅黑';
        room.color = '#fff';
        convertNode(that.state.roomScene, room);
        //机柜告警颜色
        let circleNode = {};
        circleNode.x = flagSx + (item.deviceColumn - 1) * colGap  + img.width * scalRate;
        circleNode.y = flagSy + (item.deviceRow - 1) * rowGap + img.height * scalRate  - 5;
        let centerCirleU = 20;
        let cnode = convertCircleNode(that.state.roomScene, circleNode, 5);

        //圆点阴影
        cnode.shadow = true;
        //圆点阴影污斑 （类似滤镜功能）
        cnode.shadowBlur = 10;
        //圆点阴影颜色
        cnode.shadowColor = color;
        cnode.fillColor = color;
        //偏移量x
        cnode.shadowOffsetX = 0;
        //偏移量y
        cnode.shadowOffsetY = 0;
        cnode.dragable = false;
        cnode.canDrill = false;
        cnode.mouseevent = false;
    }
}



export {cachMap, clear,convertGroup, convertLink, convertNode, convertCircleNode, findById, getCache, addAlarm, getEventPosition,topTitle,leftTitle,loadRack};