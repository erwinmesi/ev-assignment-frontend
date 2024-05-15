type FormError = { [key: string]: string };

export type HeroIcon = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string;
    titleId?: string;
  } & React.RefAttributes<SVGSVGElement>
>;

export type Role = {
  id: number;
  name: string;
  description: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roles: Role[];
};
