import MuiInputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import {
    ReactSelect as Select,
    ReactSelectAsync as Async,
    ReactSelectAsyncCreatable as AsyncCreatable,
    ReactSelectCreatable as Creatable,
} from "@vivid-planet/react-admin-final-form-material-ui";
import { styled } from "@vivid-planet/react-admin-mui";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";
import { Props as ReactSelectAsyncProps } from "react-select/lib/Async";
import { ControlProps } from "react-select/lib/components/Control";
import { Props as ReactSelectCreatableProps } from "react-select/lib/Creatable";
import { Props as ReactSelectProps } from "react-select/lib/Select";

// override the Control from @vivid-planet/react-admin-final-form-material-ui/ReactSelect with out own styled Input

function inputComponent({ inputRef, ...props }: any) {
    return <div ref={inputRef} {...props} />;
}

export const ControlInput = styled<InputBaseProps>(({ ...props }) => <MuiInputBase classes={{ root: "root", focused: "focused" }} {...props} />)`
    &.root {
        border: 1px solid #d8dbdf;
        border-radius: 2px;
        background-color: #ffffff;
        padding: 0 0 0 10px;
    }
    &.root.focused {
        border-color: #0081b8;
    }
`;

function Control<OptionType>(props: ControlProps<OptionType>) {
    const InputProps = {
        inputComponent,
        inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
        },
    };
    return <ControlInput type="text" fullWidth {...InputProps} {...props.selectProps.textFieldProps} />;
}

const vividStyles = {
    dropdownIndicator: (styles: any) => ({ ...styles, padding: "6px" }),
    clearIndicator: (styles: any) => ({ ...styles, padding: "6px" }),
};

// tslint:disable:max-classes-per-file
export class ReactSelect<OptionType> extends React.Component<FieldRenderProps & ReactSelectProps<OptionType>> {
    public render() {
        const { components, styles, ...rest } = this.props;
        // @ts-ignore TODO: Fix Later
        return <Select {...rest} components={{ Control, ...components }} styles={{ ...vividStyles, ...styles }} />;
    }
}
export class ReactSelectAsync<OptionType> extends React.Component<FieldRenderProps & ReactSelectAsyncProps<OptionType>> {
    public render() {
        const { components, styles, ...rest } = this.props;
        // @ts-ignore TODO: Fix Later
        return <Async {...rest} components={{ Control, ...components }} styles={{ ...vividStyles, ...styles }} />;
    }
}
export class ReactSelectCreatable<OptionType> extends React.Component<FieldRenderProps & ReactSelectCreatableProps<OptionType>> {
    public render() {
        const { components, styles, ...rest } = this.props;
        // @ts-ignore TODO: Fix Later
        return <Creatable {...rest} components={{ Control, ...components }} styles={{ ...vividStyles, ...styles }} />;
    }
}
export class ReactSelectAsyncCreatable<OptionType> extends React.Component<
    FieldRenderProps & ReactSelectCreatableProps<OptionType> & ReactSelectAsyncProps<OptionType>
> {
    public render() {
        const { components, styles, ...rest } = this.props;
        // @ts-ignore TODO: Fix Later
        return <AsyncCreatable {...rest} components={{ Control, ...components }} styles={{ ...vividStyles, ...styles }} />;
    }
}
