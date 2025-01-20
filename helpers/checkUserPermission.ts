import type { UserDto } from '~/DTO';

export function checkIfUserIsMaster(user: UserDto | undefined) {
  return user?.userRole.name === 'MASTER';
}

export function checkIfUserIsAdministrator(user: UserDto | undefined) {
  return user?.userRole.name === 'ADMIN';
}

export function checkIfUserIsAdministratorOrMaster(user: UserDto | undefined) {
  return user?.userRole.name === 'ADMIN' || user?.userRole.name === 'MASTER';
}
