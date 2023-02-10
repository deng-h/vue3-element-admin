import useStore from '@/store';
import { Directive, DirectiveBinding } from 'vue';

// 按钮权限校验
export const hasPerm: Directive = {
  // el：指令绑定到的元素
  // binding 是一个对象，包含以下属性：
  // value：传递给指令的值。例如，在 v-my-directive="1 + 1" 中，该值为 2
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 「超级管理员」拥有所有的按钮权限
    const { user } = useStore();
    const roles = user.roles;
    if (roles.includes('ROOT')) {
      return true;
    }
    // 「其他角色」按钮权限校验
    const { value } = binding;  // value就是自定义指令传进来的参数 如 v-hasPerm="['sys:user:add']"
    if (value) {
      const requiredPerms = value; // DOM绑定需要的按钮权限标识

      const hasPerm = user.perms?.some(perm => {
        return requiredPerms.includes(perm);
      });

      // 如果没有该权限，移除这个DOM元素
      if (!hasPerm) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\"");
    }
  }
};

// 角色权限校验
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    if (value) {
      const requiredRoles = value; // DOM绑定需要的角色编码
      const { user } = useStore();
      const hasRole = user.roles.some(perm => {
        return requiredRoles.includes(perm);
      });

      // 如果没有该角色，移除这个DOM元素
      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error("need roles! Like v-has-role=\"['admin','test']\"");
    }
  }
};
