// 检查当前时间是否在上午 9:00 到下午 4:10 之间
const isWithinTradingHours = () => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    // 上午 9:00
    const startHours = 9;
    const startMinutes = 0;

    // 下午 4:10
    const endHours = 16;
    const endMinutes = 10;

    // 计算当前时间的总分钟数
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;

    // 检查是否在范围内
    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
};

export { isWithinTradingHours };
