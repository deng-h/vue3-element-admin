/**
 * 踏板参数查询参数
 */
export interface ParamQuery extends PageQuery {
  keywords: string;
}

/**
 * 分页列表项声明
 */
export interface FixedParamType {
  id: string;
  bluetooth_mac_address: string;
  pedal_model: string;
  output_block_current: string;
  input_block_current: number;
  guard_time: string;
  low_voltage_lower_limit: string;
  low_voltage_upper_limit: number;
  start_voltage_lower_limit: string;
  start_voltage_upper_limit: string;
  gmt_create: string;
}

export interface RealParamType {
  id: string;
  bluetooth_mac_address: string;
  pedal_model: string;
  pedal_switch_status: string;
  realtime_voltage: number;
  left_door_status: string;
  left_pedal_status: string;
  right_door_status: number;
  right_pedal_status: string;
  gmt_create: string;
}
/**
 * 分页项类型声明
 */
export type FixedParamPageResult = PageResult<FixedParamType[]>;
export type RealParamPageResult = PageResult<RealParamType[]>;
