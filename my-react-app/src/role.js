/**
 * Defines the permissions available for each role.
 * Object.freeze() prevents the object from being changed.
 */
const roles = Object.freeze({
  admin: [
    'create:course',
    'read:course',
    'update:course',
    'delete:course',
    'create:user',
    'read:user',
    'update:user',
    'delete:user',
  ],
  student: [
    'read:course'
  ],
});

/**
 * Checks if a given user has a specific permission based on their role.
 *
 * @param {object} user - The user object (e.g., { role: 'admin' }).
 * @param {string} permission - The permission string to validate.
 * @returns {boolean} - True if the user has the permission, otherwise false.
 */
export function hasPermission(user, permission) {
  // Check if the user's role exists in the roles object.
  if (!roles[user.usrRole]) {
    return false;
  }
  
  // Check if the role's permissions array includes the required permission.
  return roles[user.usrRole].includes(permission);
}